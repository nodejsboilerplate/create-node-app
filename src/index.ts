#!/usr/bin/env node

import { Octokit } from "@octokit/core";
import { spawn } from "child_process";

const octokit = new Octokit();

try {
  const { data } = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: "gitmahin",
    repo: "crisis-desk-ai",
  });

  const clone_url = data.clone_url;

  const clone_process = spawn("git", ["clone", clone_url, "cloned"]);

  clone_process.stdout.setEncoding("utf8");
  clone_process.stderr.setEncoding("utf8");

  clone_process.stdout.on("data", (data) => {
    console.log("haha",data);
  });

  clone_process.stderr.on("data", (data) => {
    console.log("mahin", data);
  });

  clone_process.on("close", (code) => {
    console.log(`Cloning done with code: ${code}`);

    if (code === 0) {
      console.log("Starting dependency installation...");

      const install_deps = spawn("pnpm", ["i"], { cwd: "cloned" });

      install_deps.stdout.on("data", (data) => {
        console.log(data.toString());
      });

      install_deps.stderr.on("data", (data) => {
        console.error(data.toString());
      });

      install_deps.on("close", (installCode) => {
        console.log(`Installing deps done with code: ${installCode}`);
      });
    } else {
      console.error("Cloning failed. Skipping dependency installation.");
    }
  });
} catch (error: any) {
  console.log(error.message);
}
