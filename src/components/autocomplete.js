import React, {Component} from 'react';
import AutoComplete from '../../components/autocomplete';
import Input from '../../components/input';
import Section from '../../components/section';

class AutoCompleteTest extends Component {
  state = {
    dataSource1: [],
    dataSource2: [],
    value2: '',
  }

  onChange1 = (value) => {
    this.setState({
      dataSource1: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  onChange2 = (value) => {
    this.setState({
      value2: value,
      dataSource2: !value ? [] : [
        value,
        value + value,
        value + value + value,
      ],
    });
  }

  onSelect2 = (item) => {
    console.log(item);
    this.setState({ value2: item });
  }

  render() {
    const { dataSource1, dataSource2, value2 } = this.state;

    return (
      <Section title="自动补全">

        <div style={{ width: 300 }}>
          <AutoComplete
            dataSource={dataSource1}
            onChange={this.onChange1} />

          <br/>

          <AutoComplete
            value={value2}
            dataSource={dataSource2}
            onSelect={this.onSelect2}
            onChange={this.onChange2}>
            <Input
              prefix="search"
              suffix="close-circle"
              onSuffixClick={this.onChange2.bind(this, '')} />
          </AutoComplete>
        </div>
      </Section>
    )
  }
}

export default AutoCompleteTest;
