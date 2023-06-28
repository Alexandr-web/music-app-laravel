import host from "./host";

export default (folder, filename = "") => `${host}/storage/${folder}/${filename}`;