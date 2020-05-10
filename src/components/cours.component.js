import React, { Component } from "react";
import CoursDataService from "../services/cours.service";

export default class Cours extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getCours = this.getCours.bind(this);
    this.updatePublished = this.updatePublished.bind(this);
    this.updateCours = this.updateCours.bind(this);
    this.deleteCours = this.deleteCours.bind(this);

    this.state = {
      currentCours: {
        id: null,
        title: "",
        description: "",
        published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getCours(this.props.match.params.id);
  }

  onChangeTitle(e) {
    const title = e.target.value;

    this.setState(function(prevState) {
      return {
        currentCours: {
          ...prevState.currentCours,
          title: title
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentCours: {
        ...prevState.currentCours,
        description: description
      }
    }));
  }

  getCours(id) {
    CoursDataService.get(id)
      .then(response => {
        this.setState({
          currentCours: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updatePublished(status) {
    var data = {
      id: this.state.currentCours.id,
      title: this.state.currentCours.title,
      description: this.state.currentCours.description,
      published: status
    };

    CoursDataService.update(this.state.currentCours.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentCours: {
            ...prevState.currentCours,
            published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateCours() {
    CoursDataService.update(
      this.state.currentCours.id,
      this.state.currentCours
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "Le cours a été mis à jour avec succès!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteCours() {    
    CoursDataService.delete(this.state.currentCours.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/cours')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentCours } = this.state;

    return (
      <div>
        {currentCours ? (
          <div className="edit-form">
            <h4>Cours</h4>
            <form>
              <div className="form-group">
                <label htmlFor="title">Titre</label>
                <input
                  type="text"
                  className="form-control"
                  id="title"
                  value={currentCours.title}
                  onChange={this.onChangeTitle}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentCours.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Statut:</strong>
                </label>
                {currentCours.published ? "Publié" : "En attente"}
              </div>
            </form>

            {currentCours.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                Annuler
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publié
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteCours}
            >
              Supprimer
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateTutorial}
            >
              Mettre à jour
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Veuillez séléctionner un cours...</p>
          </div>
        )}
      </div>
    );
  }
}
