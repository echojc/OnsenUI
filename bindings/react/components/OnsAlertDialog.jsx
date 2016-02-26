var ReactTestUtils = React.addons.TestUtils;

var createDialogClass = function(domName, showFun) {

  var myClass = {
    show: function() {
      this.node.firstChild.show();
    },
    hide: function() {
      this.node.firstChild.hide();
    },
    componentDidMount: function() {
      this.node = document.createElement('div');
      document.body.appendChild(this.node);

      this.node.addEventListener('cancel', () => {
        this.props.onCancel();
      });
      this.renderPortal(this.props);
    },
    componentWillReceiveProps: function(newProps) {
      this.renderPortal(newProps);
    },
    componentWillUnmount: function() {
      ReactDOM.unmountComponentAtNode(this.node);
      document.body.removeChild(this.node);
    },
    _update: function() {
      CustomElements.upgrade(this.node.firstChild);
      if (this.props.isOpen) {
        this.show();
      } else {
        this.hide();
      }
    },
    renderPortal: function(props) {
      var element = React.createElement(domName, this.props);
      ReactDOM.render(element, this.node, this._update);
    },
    render: function() {
      return React.DOM.noscript();
    }
  };

  if (showFun) {
    myClass.show = showFun;
  };

  return React.createClass(myClass);
};

var OnsAlertDialog = createDialogClass('ons-alert-dialog');
var OnsDialog = createDialogClass('ons-dialog');

var showFun = function() {
  console.log('showFun');
  var target = this.props.getTarget();
  if (ReactTestUtils.isElement(target)) {
    target = ReactDOM.findDOMNode(target);
  }
  console.log('showFun');
  console.log(target);
  return this.node.firstChild.show(target);
};

var OnsPopover = createDialogClass('ons-popover', showFun);