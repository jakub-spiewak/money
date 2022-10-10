import axios from "axios";

const personUrl = "http://localhost:8080/person"

export const getAllPersons = () => axios.get(personUrl, {})