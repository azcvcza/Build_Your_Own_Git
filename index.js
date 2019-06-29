//build repo
//build commit
//build commit chain log
//build branch

function Git(name) {
    this.name = name;
    this.lastCommit = -1;
    this.HEAD = null;
}
Git.prototype.commit = (message) => {
    var commit = new Commit(++this.lastCommit, message);
    return commit;
}
Git.prototype.log = () => {
    var history = [];

    return history;
}
var repo = new Git("main-repo");

function Commit(id, message) {
    this.id = id;
    this.message = message;
}
//git commit -m 'hello world'
repo.commit("hello world")
console.log("Git.log() test");
var repo = new Git("test");
repo.commit("Initial commit");
repo.commit("Change 1");

var log = repo.log();
console.assert(log.length === 2); // Should have 2 commits.
console.assert(!!log[0] && log[0].id === 1); // Commit 1 should be first.
console.assert(!!log[1] && log[1].id === 0); // And then Commit 0.