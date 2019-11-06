import React, { Component } from "react";
import { getdata } from "./emaildata";
import ComposeForm from "./form";
import EmailView from "./emailview";

class MainPage extends Component {
  state = {
    emails: getdata(),
    emailsdata: null,
    inbox: null,
    sent: null,
    Draft: null,
    Work: null,
    Social: null,
    view: 0,
    emailarr: "",
    selectemails: [],
    moveto: "",
    searchValue: ""
  };

  constructor(props) {
    super(props);
    this.state.emailsdata = this.state.emails.map(arr => ({
      id: arr.id,
      sent: arr.sent,
      from: arr.from,
      to: arr.to,
      subject: arr.subject,
      text: arr.text,
      folder: arr.folder,
      select: false
    }));
    this.state.inbox = this.state.emailsdata.filter(
      inb => inb.folder === "Inbox"
    );
    this.state.sent = this.state.emailsdata.filter(
      sent => sent.folder === "Sent"
    );
    this.state.Draft = this.state.emailsdata.filter(
      sent => sent.folder === "Draft"
    );
    this.state.Work = this.state.emailsdata.filter(
      sent => sent.folder === "Work"
    );
    this.state.Social = this.state.emailsdata.filter(
      sent => sent.folder === "Social"
    );
    this.state.emailarr = this.state.inbox;
  }
  handleview = v => {
    if (v === 0) this.setState({ emailarr: this.state.inbox });
    if (v === 1) this.setState({ emailarr: this.state.sent });
    if (v === 2) this.setState({ emailarr: this.state.Draft });
    if (v === 3) this.setState({ emailarr: this.state.Work });
    if (v === 4) this.setState({ emailarr: this.state.Social });
    this.setState({ view: v, selectemails: [] });
  };
  submit = email => {
    this.state.sent.push(email);
    this.handleview(1);
  };
  handleselectemails = () => {
    let selectarr = this.state.emailarr.filter(arr => arr.select);
    this.setState({ selectemails: selectarr });
  };
  handledelete = () => {
    const { selectemails, emailarr } = this.state;
    let newarr = emailarr.filter(n => !n.select);
    let emailcat = selectemails[0].folder;
    if (emailcat === "Inbox") this.setState({ inbox: newarr });
    if (emailcat === "Sent") this.setState({ sent: newarr });
    if (emailcat === "Draft") this.setState({ Draft: newarr });
    if (emailcat === "Work") this.setState({ Work: newarr });
    if (emailcat === "Social") this.setState({ Social: newarr });
    this.setState({ selectemails: [], emailarr: newarr });
  };

  handlemoveto = e => {
    const { currentTarget: input } = e;
    let { moveto, selectemails } = this.state;
    moveto = input.value;
    if (moveto === "inbox") {
      let m = selectemails.map(l => ({
        folder: "Inbox",
        select: false,
        from: l.from,
        to: l.to,
        subject: l.subject,
        text: l.text
      }));
      selectemails = m;
      this.state.inbox = this.state.inbox.concat(m);
      this.handledelete();
      this.handleview(0);
      this.setState({ selectemails: "", moveto: "" });
    }
    if (moveto === "sent") {
      let m = selectemails.map(l => ({
        folder: "Sent",
        select: false,
        from: l.from,
        to: l.to,
        subject: l.subject,
        text: l.text
      }));
      selectemails = m;
      this.state.sent = this.state.sent.concat(m);
      this.handledelete();
      this.handleview(1);
      this.setState({ selectemails: "", moveto: "" });
    }
    if (moveto === "Draft") {
      let m = selectemails.map(l => ({
        folder: "Draft",
        select: false,
        from: l.from,
        to: l.to,
        subject: l.subject,
        text: l.text
      }));
      selectemails = m;
      this.state.Draft = this.state.Draft.concat(m);
      this.handledelete();
      this.handleview(2);
      this.setState({ selectemails: "", moveto: "" });
    }
    if (moveto === "Work") {
      let m = selectemails.map(l => ({
        folder: "Work",
        select: false,
        from: l.from,
        to: l.to,
        subject: l.subject,
        text: l.text
      }));
      selectemails = m;
      this.state.Work = this.state.Work.concat(m);
      this.handledelete();
      this.handleview(3);
      this.setState({ selectemails: "", moveto: "" });
    }
    if (moveto === "Social") {
      let m = selectemails.map(l => ({
        folder: "Social",
        select: false,
        from: l.from,
        to: l.to,
        subject: l.subject,
        text: l.text
      }));
      selectemails = m;
      this.state.Social = this.state.Social.concat(m);
      this.handledelete();
      this.handleview(4);
      this.setState({ selectemails: "", moveto: "" });
    }
  };
  keyPress = e => {
    if (e.keyCode === "13") {
      this.state.emailarr = this.state.emails.filter(
        n =>
          n.from.includes(e.target.value) ||
          n.to.includes(e.target.value) ||
          n.subject.includes(e.target.value) ||
          n.text.includes(e.target.value)
      );
      this.handleview(6);
    }
  };
  render() {
    const {
      inbox,
      Work,
      Draft,
      moveto,
      selectemails,
      sent,
      Social,
      view
    } = this.state;
    return (
      <div className="container">
        <div className="row bg-dark text-white m-2 p-2">My Messages</div>
        <div className="row">
          <div className="col-3"></div>
          <div className="col-6 m-2">
            <input
              type="text"
              placeholder="Search"
              onKeyDown={this.keyPress}
              className="form-control"
            />
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <button
              className="btn btn-primary"
              onClick={() => this.handleview(5)}
            >
              Compose
            </button>
            <div
              className={view === 0 && "bg-warning  mr-2"}
              onClick={() => this.handleview(0)}
            >
              Inbox({inbox.length})
            </div>
            <div
              className={view === 1 && "bg-warning  mr-2"}
              onClick={() => this.handleview(1)}
            >
              Sent({sent.length})
            </div>
            <div
              className={view === 2 && "bg-warning  mr-2"}
              onClick={() => this.handleview(2)}
            >
              Draft({Draft.length})
            </div>
            <div
              className={view === 3 && "bg-warning  mr-2"}
              onClick={() => this.handleview(3)}
            >
              Work({Work.length})
            </div>
            <div
              className={view === 4 && "bg-warning  mr-2"}
              onClick={() => this.handleview(4)}
            >
              Social({Social.length})
            </div>
          </div>
          <div className="col-8 ml-4">
            {selectemails.length > 0 ? (
              <div className="row ">
                <button
                  className="btn btn-primary mr-3"
                  onClick={this.handledelete}
                >
                  Delete
                </button>
                <select
                  className="form-control w-50"
                  value={moveto}
                  onChange={this.handlemoveto}
                >
                  <option disabled selected value="">
                    Move to
                  </option>
                  <option value="inbox">inbox</option>
                  <option value="sent">Sent</option>
                  <option value="Draft">Draft</option>
                  <option value="Work">Work</option>
                  <option value="Social">Social</option>
                </select>
              </div>
            ) : (
              ""
            )}
            {view !== 5 && view !== 6 ? (
              <EmailView
                email={this.state.emailarr}
                handleselectemails={this.handleselectemails}
              />
            ) : (
              ""
            )}
            {view === 5 ? <ComposeForm submit={this.submit} /> : ""}
            {view === 6 ? <EmailView email={this.state.emailarr} /> : ""}
          </div>
        </div>
      </div>
    );
  }
}

export default MainPage;
