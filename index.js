//build repo
//build commit
//build commit chain log
//build branch

function Git(name) {
    this.name = name;
    this.lastCommit = -1;
    this.branches = [];
    var master = new Branch("master", null);
    this.branches.push(master);
    this.HEAD = master;
}
Git.prototype.commit = (message) => {
    var commit = new Commit(++this.lastCommit, this.HEAD, message);
    this.HEAD.commit = commit;
    return commit;
}
Git.prototype.log = () => {
    var commit = this.HEAD.commit,
        history = [];

    while (commit) {
        history.push(commit);
        // Keep following the parent
        commit = commit.parent;
    }

    return history;
}
Git.prototype.checkout = (branchname) => {
    for (var i = this.branches.length; i--;) {
        if (this.branches[i].name === branchName) {
            // We found an existing branch
            console.log("Switched to existing branch: " + branchName);
            this.HEAD = this.branches[i];
            return this;
        }
    }
    var newBranch = new Branch(branchName, this.HEAD.commit);
    // Store branch.
    this.branches.push(newBranch);
    // Update HEAD
    this.HEAD = newBranch;

    console.log("Switched to new branch: " + branchName);
    return this;
}
var repo = new Git("main-repo");

function Commit(id, parent, message) {
    this.id = id;
    this.parent = parent;
    this.message = message;
}

function Branch(name, commit) {
    this.name = name;
    this.commit = commit;
}
//git commit -m 'hello world'
console.log("Git.log() test");
var repo = new Git("test");
var log = repo.log();
repo.commit("Initial commit");
repo.commit("Change 1");
// Maps the array of commits into a string of commit ids.
// For [C2, C1,C3], it returns "2-1-0"
function historyToIdMapper(history) {
    var ids = history.map(function(commit) {
        return commit.id;
    });
    return ids.join("-");
}
console.assert(historyToIdMapper(repo.log()) === "1-0"); // Should show 2 commits.
repo.checkout("testing");
repo.commit("Change 3");

console.assert(historyToIdMapper(repo.log()) === "2-1-0"); // Should show 3 commits.

repo.checkout("master");
console.assert(historyToIdMapper(repo.log()) === "1-0"); // Should show 2 commits. Master unpolluted.

repo.commit("Change 3");
console.assert(historyToIdMapper(repo.log()) === "3-1-0"); // Continue on master with 4th commit.