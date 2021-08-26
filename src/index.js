import mockScheme from "./mockScheme.js";

function plugin({ $auth }) {
    console.log($auth);
}

export default plugin;

export {
    mockScheme,
};
