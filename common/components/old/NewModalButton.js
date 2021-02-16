// -----------------------------------------------------------------
// Experiment to show Bootstrap modal popups in a React friendly
// manner. These are not Redux components and will not be used.
// Instead we will likely use the React-Bootstrap components
// I played around with various ways to do modals for Family Shaadi
// so they werent based on Redux. I think this is the best approach
// that was finally used on Family Shaadi
// -----------------------------------------------------------------
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'

class NewModalButton extends React.Component{
    getInitialState() {
        return { isModalOpen: false };
    }

    handleClick() {
        this.openModal ()
        // do the action - this.props.fetchCB ()
    }

    openModal() {
        this.setState({ isModalOpen: true });
    }

    closeModal() {
        this.setState({ isModalOpen: false });
    }

    render() {
        console.log ("modal open is", this.state.isModalOpen)
        
        return (
          <div>
            <button type="button" className="btn btn-primary" onClick={this.handleClick}>
                New Modal
            </button>

            {this.state.isModalOpen ? <NewMyModal closeCB={this.closeModal}/> : null}
          </div>
        );
    }
};

class NewMyModal extends React.Component{
    componentDidMount() {    
        var modalNode = $(ReactDOM.findDOMNode(this))
        console.log ("new modal mounted...", modalNode)
        if (modalNode) {
            modalNode.modal()
            modalNode.on('hidden.bs.modal', this.props.closeCB)
        }
    }
    
    componentWillUnmount() {    
        console.log ("new modal unmounted")
    }

    render() {
        return (
            <div id="newMyModal" className="modal fade" role="dialog">
              <div className="modal-dialog">

                  <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">&times;</button>
                    <h4 className="modal-title">Modal Header</h4>
                  </div>
                  <div className="modal-body">
                    <p>Some new modal.</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                  </div>
                </div>

              </div>
            </div>
        )
    }
};

export default NewModalButton
