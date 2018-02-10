import { minWidth } from '../utils/environment';

var isAnimating = false;
var headerOffset;
var speed = 300;

export default function ($element) {
	if ($element instanceof jQuery && $element.length > 0) {
		if (isAnimating === false) {

			if (window.matchMedia('(min-width: ' + minWidth + 'px)').matches) {
				headerOffset = 70;
			} else {
				headerOffset = 90;
			}

			isAnimating = true;

			$('html, body').animate({
				scrollTop: $element.offset().top - headerOffset
			}, speed, 'swing', () => {
				isAnimating = false;
			});
		}
	}
}
