import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

Vue.config.productionTip = false;

async function captureError(ex) {
  var errorData = {
    name: ex.name, // e.g. ReferenceError
    message: ex.line, // e.g. x is undefined
    url: document.location.href,
    stack: ex.stack // stacktrace string; remember, different per-browser!
    };

    var message = JSON.stringify(errorData);
    if (message === "")
    {
        message = "Error is missing";
    }

    await axios.post("http://localhost:5000/api/error", { error: message })
        .then(r => console.log(r.status))
        .catch(e => console.log(e));
}

Vue.config.errorHandler = (err, vm, info) => {
  console.log("Vue.config.errorHandler");
  console.log(`Error: ${err.toString()}\nInfo: ${info}`);
    captureError(err);
};

window.onerror = function(message, source, lineno, colno, error) {
  console.log("window.onerror");
  console.log("ONE ERROR HANDLER TO RULE THEM ALL:", message);
  captureError(error);
};

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
