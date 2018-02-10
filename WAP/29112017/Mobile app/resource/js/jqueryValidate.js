;(function($,window,undefined){
	var validateH=function(selector,opciones){
		//tengo que declarar las variables q me interesan
		
		this.selector = selector;
		if(this.init)
		{
			this.init(selector,opciones);
		}
	}
	validateH.prototype={
		default:{
			lang:"en",
			callback:function (input){},
			validCallback:function (input){},
			successEnable:false,
			success:function (data){

			}
		},
		mensages:{
			es:{
				required:"Campo obligatorio",
				email:"Email no valido",
				match:"Los campos no coinciden",
				minlength:"El campo requiere %s caracteres como minimo"
			},
			en:{
				required:"Required field.",
				email:"Invalid Email address.",
				match:"Fields do not match.",
				minlength:"Requires at least %s caracteres."
			}
		},
		validateEmail:function(email){
			var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		    return re.test(email);
		},
		validate:function(){

		},
		clean:function(){
			var select = this.selector;
			select.find('.data_validation_error').each(function (index){
				$(this).remove();
			});
		},
		init:function(select,opciones){
			if(typeof opciones != "undefined" && typeof opciones.success == "function")this.default.successEnable=true;
			this.config=$.extend({},this.default,opciones);

			valido = true;
			var paso = this;//para no entrar en conflicto dentro del .each
			var successData = "";
			select.find('input,textarea,select').filter('[data-validation]').each(function (index){
				
				var data_validation = $(this).attr("data-validation");
				var valtype = data_validation.split(" ");
				for(var i in valtype){
					if(valtype[i] == "required"){
						if($(this).val()=="" || $(this).val()==false){
							valido = false;
							if(!$("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("<p class='data_validation_error' id='"+$(this).prop("name")+"_error_"+valtype[i]+"' style='color:red'>"+paso.mensages[paso.config.lang].required+"</p>").insertAfter($(this));
								paso.config.callback(this);
							}
						}else{
							if($("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("#"+$(this).prop("name")+"_error_"+valtype[i]).remove();
								paso.config.validCallback(this);
								
							}
						}
						
					}
					if(valtype[i] == "email"){
						if(!paso.validateEmail($(this).val())){
							valido = false;
							if(!$("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("<p class='data_validation_error' id='"+$(this).prop("name")+"_error_"+valtype[i]+"' style='color:red'>"+paso.mensages[paso.config.lang].email+"</p>").insertAfter($(this));
								paso.config.callback(this);
								
							}
						}else{
							if($("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("#"+$(this).prop("name")+"_error_"+valtype[i]).remove();
								paso.config.validCallback(this);
							}
						}
						
					}
					if(valtype[i] == "match"){
						var match_id = $(this).attr("matchid");
						
						if(! ( $(this).val() == $("#"+match_id).val() ) ){
							valido = false;
							if(!$("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("<p class='data_validation_error' id='"+$(this).prop("name")+"_error_"+valtype[i]+"' style='color:red'>"+paso.mensages[paso.config.lang].match+"</p>").insertAfter($(this));
								paso.config.callback(this);
								
							}
						}else{
							if($("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("#"+$(this).prop("name")+"_error_"+valtype[i]).remove();
								paso.config.validCallback(this);

							}
						}
						
					}
					if(valtype[i] == "min-length"){
						var thislenght = $(this).attr("data-validation-length");
						
						if(! ( $(this).val().length >= thislenght ) && $(this).val()!="" ){
							valido = false;
							if(!$("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("<p class='data_validation_error' id='"+$(this).prop("name")+"_error_"+valtype[i]+"' style='color:red'>"+paso.mensages[paso.config.lang].minlength.replace("%s",thislenght)+"</p>").insertAfter($(this));
								paso.config.callback(this);
								
							}
						}else{
							if($("#"+$(this).prop("name")+"_error_"+valtype[i]).length){
								$("#"+$(this).prop("name")+"_error_"+valtype[i]).remove();
								paso.config.validCallback(this);

							}
						}
						
					}
					if(valido){

						var amp = (successData.length>1)?"&":"";
						successData+=amp+$(this).attr("name")+"="+$(this).val()+"";
					}else{
						successData="";
					}
					
				}
			});
			if(select.is("form") && valido ){
				if(paso.config.successEnable){
					paso.config.success(successData);
				}else{
					select.submit()
				}

			}else if(valido){
				paso.config.success(successData);
			}

			//return valido;
			

			

		},

	}
	$.fn.validate=function(opciones){
		if(typeof opciones=='string')
		{
			metodo=opciones;
			args=Array.prototype.slice.call(arguments,1);
			var validHel=(this.data('validHel'))?this.data('validHel'):new validate;
			if(validHel[metodo])
			{
				validHel[metodo].apply(validHel,args);
			}
		}else if(typeof opciones=='object' || !opciones)
		{
			this.data('validHel',new validate(this,opciones));
		}else if(typeof opciones == "undefined"){
			this.data('validHel',new validate(this,{}));
		}else
		{
			$.error('Error, parametro ingresado es incorrecto.');
		}
		return this;
	}
	window.validate=validateH;
})(jQuery,window);