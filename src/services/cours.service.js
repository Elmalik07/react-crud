import http from "../http-common";

class CoursDataService {
  getAll() {
    return http.get("/cours");
  }

  get(id) {
    return http.get(`/cours/${id}`);
  }

  create(data) {
    return http.post("/cours", data);
  }

  update(id, data) {
    return http.put(`/cours/${id}`, data);
  }

  delete(id) {
    return http.delete(`/cours/${id}`);
  }

  deleteAll() {
    return http.delete(`/cours`);
  }

  findByTitle(title) {
    return http.get(`/cours?title=${title}`);
  }
}

export default new CoursDataService();
