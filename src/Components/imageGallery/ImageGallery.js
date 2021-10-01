import { Component } from "react";
import ImageGalleryItem from "./imageGalleryItem/ImageGalleryItem";
import imgAPI from "../../Services/pixabay-api";
import { toast } from "react-toastify";

const Status = {
  IDLE: "idle",
  PENDING: "pending",
  RESOLVED: "resolved",
  REJECTED: "rejected",
};

export default class ImageGallery extends Component {
  state = {
    imgs: null,
    error: null,
    status: Status.IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevProps.query;
    const nextQuery = this.props.query;
    const prevPage = prevProps.page;
    const nextPage = this.props.page;

    if (prevQuery !== nextQuery || prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      let prevPage = [];
      if (prevState.imgs) {
        prevPage = [...prevState.imgs];
      }
      imgAPI
        .fetchImg(nextQuery, nextPage)
        .then(({ hits }) => {
          if (hits[0]) {
            return this.setState({
              imgs: [...prevPage, ...hits],
              status: Status.RESOLVED,
            });
          }
          toast.error("Такой картинки не существует.");
          this.setState({ status: Status.IDLE });
        })
        .catch((error) => this.setState({ error, status: Status.REJECTED }));
    }
  }

  render() {
    const { imgs, error, status } = this.state;
    const { query, handlePageIncr, onOpen } = this.props;

    if (status === "idle") {
      return <div>Введите поисковый запрос.</div>;
    }

    if (status === "pending") {
      return <div>Ожидаем ответ по запросу: {query}</div>;
    }

    if (status === "rejected") {
      return <div>Возникла ошибка: {error.message}</div>;
    }

    if (status === "resolved") {
      return (
        <>
          <ul className="ImageGallery">
            {imgs.map((img) => (
              <ImageGalleryItem
                url={img.largeImageURL}
                alt={img.tags}
                key={img.id}
                onClick={onOpen}
              />
            ))}
          </ul>
          <button
            onClick={() => handlePageIncr()}
            className="Button"
            type="button"
          >
            Load More!
          </button>
        </>
      );
    }
  }
}
