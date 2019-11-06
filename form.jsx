import React, { Component } from "react";
class ComposeForm extends Component {
  state = {
    data: {
      to: "",
      subject: "",
      text: "",
      folder: "Sent",
      sent: true,
      from: "jack@test.com"
    }
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.submit(this.state.data);
  };
  handlechange = ({ currentTarget: input }) => {
    const { data } = this.state;
    data[input.id] = input.value;
    this.setState({ data });
  };
  render() {
    const { data } = this.state;
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="to">To</label>
            <input
              type="text"
              id="to"
              value={data.to}
              onChange={this.handlechange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              type="text"
              id="subject"
              value={data.subject}
              onChange={this.handlechange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label htmlFor="text">Message</label>
            <input
              type="text"
              id="text"
              value={data.text}
              onChange={this.handlechange}
              className="form-control"
            />
          </div>
          <button className="btn btn-primary">Send</button>
        </form>
      </div>
    );
  }
}

export default ComposeForm;
