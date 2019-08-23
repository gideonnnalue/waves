import React, { Component } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import faPlusCircle from "@fortawesome/fontawesome-free-solid/faPlusCircle";
import CircularProgress from "@material-ui/core/CircularProgress";

class FileUpload extends Component {
  constructor() {
    super();
    this.state = {
      updloadedFiles: [],
      uploading: false
    };
  }

  onDrop = files => {
    this.setState({ uploading: true });
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" }
    };

    formData.append("file", files[0]);

    axios.post("/api/users/uploadimage", formData, config).then(response => {
      this.setState(
        {
          uploading: false,
          updloadedFiles: [...this.state.updloadedFiles, response.data]
        },
        () => {
          this.props.imagesHandler(this.state.updloadedFiles);
        }
      );
    });
  };

  onRemove = id => {
    axios.get(`/api/users/removeimage?public_id=${id}`).then(response => {
      let images = this.state.updloadedFiles.filter(item => {
        return item.public_id !== id;
      });

      this.setState(
        {
          updloadedFiles: images
        },
        () => {
          this.props.imagesHandler(images);
        }
      );
    });
  };

  showUploadedImages = () =>
    this.state.updloadedFiles.map(item => (
      <div
        className="dropzone_box"
        key={item.public_id}
        onClick={() => this.onRemove(item.public_id)}
      >
        <div
          className="wrap"
          style={{
            background: `url(${item.url}) no-repeat`
          }}
        />
      </div>
    ));

  static getDerivedStateFromProps(props, state) {
    if (props.reset) {
      return (state = {
        updloadedFiles: []
      });
    }
    return null;
  }

  render() {
    return (
      <div>
        <section>
          <div className="dropzone clear">
            <div className="dropzone_box">
              <Dropzone onDrop={e => this.onDrop(e)} multiple={false}>
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className="wrap">
                    <FontAwesomeIcon icon={faPlusCircle} />
                    <input {...getInputProps()} />
                  </div>
                )}
              </Dropzone>
            </div>
            {this.showUploadedImages()}
            {this.state.uploading ? (
              <div
                className="dropzone_box"
                style={{
                  textAlign: "center",
                  paddingTop: "60px"
                }}
              >
                <CircularProgress
                  style={{
                    color: "#00bcd4"
                  }}
                  thickness={7}
                />
              </div>
            ) : null}
          </div>
        </section>
      </div>
    );
  }
}

export default FileUpload;
