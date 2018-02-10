/* jshint esnext: true */
import AbstractModule from './AbstractModule'

export default class extends AbstractModule {
	constructor(options) {
		super(options);
		this.$inputs = this.$el.find(':input');
		this.inputSelectors = 'input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], textarea';
		this.$panes = this.$el.find('.js-form-pane');
		this.$consent = this.$el.find('.js-form-consent');
		this.$consentLabel = this.$el.find('.js-form-consent-label');
		this.$consentError = this.$el.find('.js-form-consent-error');
		this.$consentError = this.$el.find('.js-form-consent-error');
		this.$formWrap = this.$el.find('.js-form-wrap');
		this.$formFeedback = this.$el.find('.js-form-feedback');
		this.currentPane = 0;

		this.updateTextFields();



		var _this = this;

		// Switch form panes
		// Simple switch between index 0 and 1 for now
		this.$el.on('click.ContactForm', '.js-switch-pane', () => {
			this.goToNextPane();
		});

		this.$el.on('click.ContactForm', '.js-submit', () => {
			this.$el.submit();
		});

		this.$el.on('submit.ContactForm', function(event) {
			event.preventDefault();

			if (_this.currentPane === 0) {
				_this.goToNextPane();
			} else {
				var data = $(this).serializeArray();
				_this.submitForm(event, data);
			}
		});

		// Add active if form auto complete
		this.$el.on('change.ContactForm', this.inputSelectors, function () {
			var $inputElement = $(this);

			if($inputElement.val().length !== 0 || $inputElement.attr('placeholder') !== undefined) {
				$inputElement.siblings('label').addClass('is-active');
			}
			var error = _this.fieldHasError($inputElement);
		});

		// Add active when element has focus
		this.$el.on('focus.ContactForm', this.inputSelectors, function () {
			$(this).siblings('label, i').addClass('is-active');
		});

		this.$el.on('blur.ContactForm', this.inputSelectors, function () {
			var $inputElement = $(this);

			if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') === undefined) {
				$inputElement.siblings('label, i').removeClass('is-active');
			}

			if ($inputElement.val().length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr('placeholder') !== undefined) {
				$inputElement.siblings('i').removeClass('is-active');
			}

			var error = _this.fieldHasError($inputElement);
		});
	}

	/**
	 * Upon form submit, many things happen
	 * - Validation of inputs
	 * - Validation of consent
	 * - Delivery of form data to the server
	 * - Managing server response states
	 *
	 * @param  {Event}         event  jQuery Event object
	 * @param  {array|string}  data  Form data
	 */
	submitForm(event, data) {
		var hasErrors = this.fieldsHaveErrors(this.$inputs);

		if (!this.$consent.is(':checked')) {
			this.$consentLabel.addClass('has-error');
			this.$consentError.removeClass('is-hidden');
			hasErrors = true;
		}

		if (!hasErrors) {
			this.$consentLabel.removeClass('has-error');
			this.$consentError.addClass('is-hidden');

			var jqxhr = $.ajax({
				method: 'POST',
				url: this.$el.attr('action'),
				data: data
			})
			.done((response) => {
				if (response.success === true) {
					this.$panes.eq(this.currentPane).fadeOut(() => {
						this.$formFeedback.fadeIn();
					});
				} else {
					this.manageErrors(response.errors);
				}
			})
			.fail(() => {
				console.log('error');
			});
		}
	}

	/**
	 * Simple function to determine if form is valid enough to switch panes
	 * Used by 'Next' button and form submit
	 */
	goToNextPane() {
		if (!this.fieldsHaveErrors(this.$panes.eq(this.currentPane).find(':input'))) {
			this.$panes.eq(this.currentPane).fadeOut(() => {
				this.currentPane = 1;
				this.$panes.eq(this.currentPane).fadeIn();
			});
		}
	}

	/**
	 * Loop through errors sent back by the servers and attempt to identify the faulty elements
	 * @param  {array}  errors  An array of element names that are in error
	 */
	manageErrors(errors) {
		var i = 0, len = errors.length;
		for (; i < len; i++) {
			$('#' + errors[i]).addClass('has-error');
		}
	}

	/**
	 * Function to update labels of text fields
	 * @see  MaterializeCSS
	 */
	updateTextFields() {
		$(this.inputSelectors).each(function(index, element) {
			if ($(element).val().length > 0 || element.autofocus || $(this).attr('placeholder') !== undefined || $(element)[0].validity.badInput === true) {
				$(this).siblings('label, i').addClass('is-active');
			} else {
				$(this).siblings('label, i').removeClass('is-active');
			}
		});
	}

	/**
	 * Function to validate single inputs
	 * @see  MaterializeCSS
	 */
	fieldHasError($object) {
		var hasLength = $object.attr('length') !== undefined;
		var lenAttr = parseInt($object.attr('length'));
		var len = $object.val().length;
		var fieldHasError = false;

		if ($object.hasClass('js-validate')) {
			if ($object.val().length !== 0) {
				if ($object[0].validity.badInput !== false) {
					// Check for character counter attributes
					if (($object.is(':valid') && hasLength && (len <= lenAttr)) || ($object.is(':valid') && !hasLength)) {
					} else {
						fieldHasError = true;
					}
				}
				if ($object.attr('type') == 'email') {
					var EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
					if (!EMAIL_REGEX.test($object.val())) {
						fieldHasError = true;
					}
				}

			} else {
				fieldHasError = true;
			}

			if (fieldHasError) {
				$object.addClass('has-error');
			} else {
				$object.removeClass('has-error');
			}
		}

		return fieldHasError;
	}

	/**
	 * Validate multiple inputs
	 * @return {boolean}
	 */
	fieldsHaveErrors($inputs) {
		var i = 0;
		var len = $inputs.length;
		var hasErrors = false;

		for (;i < len; i++) {
			if(this.fieldHasError($inputs.eq(i))) {
				hasErrors = true;
			}
		}

		return hasErrors;
	}

	destroy() {
		this.$el.off('.ContactForm');
	}
}
