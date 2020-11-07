#!/usr/bin/env node

const iniparser = require("iniparser");
const {execSync} = require("child_process");
const execOpts = {stdio: "ignore", encoding: "utf8"};
const regex = /^submodule "([\w]+)"$/mus;
try {
    const modules = iniparser.parseSync("./.gitmodules");
    for (const [header, module] of Object.entries(modules)) {
        const name = header.match(regex)[1];
        try {
            execSync(`git submodule add ${module.url} ${module.path}`, execOpts);
            console.info("Added submodule: " + name);
        }
        catch (e) {
            console.warn("Could not add submodule: " + name);
        }
    }
}
catch (e) {
    console.warn("Could not load .gitmodules");
}
