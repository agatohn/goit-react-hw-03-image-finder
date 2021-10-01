import { Component } from "react";
import { ToastContainer } from "react-toastify";
import SearchForm from "./Components/searchForm/SearchForm";
import ImageGallery from "./Components/imageGallery/ImageGallery";
import Modal from "./Components/modal/Modal";

export default class App extends Component {
  state = {
    query: "",
    page: "1",
    showModal: false,
    urlModal: "",
  };

  handleFormSubmit = (query) => {
    this.setState({ query });
  };

  closeModal = () => {
    this.setState({ urlModal: "", showModal: false });
  };

  handleImageClick = (url) => {
    this.setState({ urlModal: url, showModal: true });
  };
  //url needed
  render() {
    return (
      <div style={{ maxWidth: 1170, margin: "0 auto", padding: 20 }}>
        <SearchForm onSubmit={this.handleFormSubmit} />
        {this.state.showModal && (
          <Modal url={this.state.urlModal} onClose={this.closeModal} />
        )}
        <ImageGallery query={this.state.query} onOpen={this.handleImageClick} />
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    );
  }
}
