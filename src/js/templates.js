this["MyApp"] = this["MyApp"] || {};
this["MyApp"]["Templates"] = this["MyApp"]["Templates"] || {};

this["MyApp"]["Templates"]["numberDiff"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  
  return "widget--active";
  }

  buffer += "<div class=\"widget ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.enabled), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n\n	<header class=\"widget__header\">\n		<i class=\"circle\"></i> "
    + escapeExpression((helper = helpers['default'] || (depth0 && depth0['default']),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.name), "Number", options) : helperMissing.call(depth0, "default", ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.name), "Number", options)))
    + " \n	</header>\n	\n	<div class=\"widget__content\">\n		<h1 class=\"widget__content__header\">";
  if (helper = helpers.displayCounter) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.displayCounter); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n		<p><i class=\"indicator indicator-";
  if (helper = helpers.direction) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.direction); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\"></i> ";
  if (helper = helpers.percentageDiff) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.percentageDiff); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "% <span class=\"widget__content__prevCounter\">from ";
  if (helper = helpers.displayLastCounter) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.displayLastCounter); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</span></p>\n	</div>\n\n</div>";
  return buffer;
  });

this["MyApp"]["Templates"]["sparkLine"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, options, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";

function program1(depth0,data) {
  
  
  return "widget--active";
  }

  buffer += "<div class=\"widget ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.enabled), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n\n	<header class=\"widget__header\">\n		<i class=\"circle\"></i> "
    + escapeExpression((helper = helpers['default'] || (depth0 && depth0['default']),options={hash:{},data:data},helper ? helper.call(depth0, ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.name), "Sparkline", options) : helperMissing.call(depth0, "default", ((stack1 = (depth0 && depth0.options)),stack1 == null || stack1 === false ? stack1 : stack1.name), "Sparkline", options)))
    + " \n	</header>\n	\n	<div class=\"widget__content\">\n		\n\n		<embed class=\"sparkline\" src=\"/js/sparkline.svg?";
  if (helper = helpers.csvValues) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.csvValues); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "&current&rgba:255,255,255,1\" type=\"image/svg+xml\"></embed>\n\n	</div>\n\n</div>";
  return buffer;
  });

this["MyApp"]["Templates"]["timeDate"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, helper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  
  return "widget--active";
  }

  buffer += "<div class=\"widget ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + " ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.enabled), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n\n	<header class=\"widget__header\">\n		<i class=\"circle\"></i> ";
  if (helper = helpers.name) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.name); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "\n	</header>\n	\n	<div class=\"widget__content\">\n		<h1 class=\"widget__content__header\">";
  if (helper = helpers.time) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.time); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</h1>\n		<p class=\"day\">";
  if (helper = helpers.day) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.day); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n		<p class=\"date\">";
  if (helper = helpers.date) { stack1 = helper.call(depth0, {hash:{},data:data}); }
  else { helper = (depth0 && depth0.date); stack1 = typeof helper === functionType ? helper.call(depth0, {hash:{},data:data}) : helper; }
  buffer += escapeExpression(stack1)
    + "</p>\n	</div>\n\n</div>";
  return buffer;
  });

this["MyApp"]["Templates"]["widgetContainer"] = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "widget--active";
  }

  buffer += "<div class=\"widget ";
  stack1 = helpers['if'].call(depth0, (depth0 && depth0.enabled), {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">\n\n	<header class=\"widget__header\">\n	</header>\n	\n	<div class=\"widget__content\">\n	</div>\n\n</div>";
  return buffer;
  });