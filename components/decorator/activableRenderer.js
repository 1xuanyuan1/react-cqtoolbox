import React, { Component, PropTypes } from 'react';

const ActivableRendererFactory = (options = { delay: 500 }) =>
  ActivableComponent => class ActivableRenderer extends Component {
    static propTypes = {
      active: PropTypes.bool.isRequired,
      children: PropTypes.node,
      delay: PropTypes.number,
    };

    static defaultProps = {
      delay: options.delay,
    }

    state = {
      active: this.props.active,
      rendered: this.props.active,
    };

    componentWillMount() {
      if (this.props.active) this.renderAndActivate();
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.active && !this.props.active) this.renderAndActivate();
      if (!nextProps.active && this.props.active) this.deactivateAndUnrender();
    }

    componentWillUnmount() {
      clearTimeout(this.activateTimeout);
      clearTimeout(this.unrenderTimeout);
    }

    renderAndActivate() {
      if (this.unrenderTimeout) clearTimeout(this.unrenderTimeout);
      this.setState({ rendered: true, active: false }, () => {
        this.activateTimeout = setTimeout(() => this.setState({ active: true }), 20);
      });
    }

    deactivateAndUnrender() {
      this.setState({ rendered: true, active: false }, () => {
        this.unrenderTimeout = setTimeout(() => {
          this.setState({ rendered: false });
          this.unrenderTimeout = null;
        }, this.props.delay);
      });
    }

    render() {
      const { delay, ...others } = this.props; // eslint-disable-line no-unused-vars
      const { active, rendered } = this.state;

      return rendered
        ? <ActivableComponent {...others} active={active} />
        : null;
    }
  };

export default ActivableRendererFactory;
