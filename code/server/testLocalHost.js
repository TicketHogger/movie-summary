import http from "k6/http";
import { sleep } from "k6";

export let options = {
    vus: 200,
    duration: "3m",
    rps: 1000,
  };

export default function() {
    http.get(`http://127.0.0.1:3007/api/movies/${Math.floor(Math.random() * 1000000) + 9000000}/summary`);
    sleep(1);
  };