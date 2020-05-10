import React, { Component } from "react";
import CoursDataService from "../services/cours.service";
import { Link } from "react-router-dom";

export default class ListCours extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
    this.retrieveCours = this.retrieveCours.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveCours = this.setActiveCours.bind(this);
    this.removeAllCours = this.removeAllCours.bind(this);
    this.searchTitle = this.searchTitle.bind(this);

    this.state = {
      tutorials: [],
      currentCours: null,
      currentIndex: -1,
      searchTitle: ""
    };
  }

  componentDidMount() {
    this.retrieveCours();
  }

  onChangeSearchTitle(e) {
    const searchTitle = e.target.value;

    this.setState({
      searchTitle: searchTitle
    });
  }

  retrieveCours() {
    CoursDataService.getAll()
      .then(response => {
        this.setState({
          cours: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveCours();
    this.setState({
      currentCours: null,
      currentIndex: -1
    });
  }

  setActiveCours(cours, index) {
    this.setState({
      currentCours: cours,
      currentIndex: index
    });
  }

  removeAllCours() {
    CoursDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchTitle() {
    CoursDataService.findByTitle(this.state.searchTitle)
      .then(response => {
        this.setState({
          cours: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchTitle, cours, currentCours, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recherche par titre"
              value={searchTitle}
              onChange={this.onChangeSearchTitle}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchTitle}
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Liste des cours</h4>

          <ul className="list-group">
            {cours &&
              cours.map((cours, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveCours(cours, index)}
                  key={index}
                >
                  {cours.title}
                </li>
              ))}
          </ul>

          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllCours}
          >
            Tout supprimer
          </button>
        </div>
        <div className="col-md-6">
          {currentCours ? (
            <div>
              <h4>Cours</h4>
              <div>
                <label>
                  <strong>Titre:</strong>
                </label>{" "}
                {currentCours.title}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentCours.description}
              </div>
              <div>
                <label>
                  <strong>Statut:</strong>
                </label>{" "}
                {currentCours.published ? "Publié" : "En attente"}
              </div>

              <Link
                to={"/cours/" + currentCours.id}
                className="badge badge-warning"
              >
                Editer
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Veuillez séléctionner un cours...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}
