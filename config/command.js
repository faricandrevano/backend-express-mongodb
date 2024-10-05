#!/usr/bin/env node

import { program } from "commander";
import chalk from "chalk";
import inquirer from "inquirer";
import figlet from "figlet";
import { connectToDatabase, startServer } from "../index.js";
import ora from "ora";
import fs from "fs";
import path from "path";

program.description(
  chalk.green(
    figlet.textSync("EXMO", { horizontalLayout: "full", font: "3D-ASCII" })
  )
);

let debouncerTimer;
function watchFiles(dir) {
  fs.watch(dir, { recursive: true }, (eventType, filename) => {
    if (filename) {
      const fullpath = path.join(dir, filename);
      // ignore node_modules
      if (fullpath.includes("node_modules")) {
        return;
      }
      const ext = path.extname(filename);
      if (ext === ".js") {
        clearTimeout(debouncerTimer);
        debouncerTimer = setTimeout(() => {
          console.log(
            `File ${filename}  has been changed. Restarting server...`
          );
          startServer();
        }, 100);
      }
    }
  });
}

// program running server
program
  .command("serve")
  .description("Serve the application on the NODE development server")
  .action(async () => {
    try {
      // wait to connect database
      await connectToDatabase();
      watchFiles(".");
      startServer();
    } catch (error) {
      console.error("Error starting server:", error);
    }
  });
// program make route
program
  .command("make:route [name]")
  .description("Create a new file route")
  .action(async (name) => {
    if (!name) {
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "controllerName",
          message: "what is the name of your route",
          required: true,
        },
      ]);
      name = answer.controllerName;
    }
    const dir = path.join(process.cwd(), "routes");
    const filepath = path.join(dir, `${name}.js`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    if (fs.existsSync(filepath)) {
      console.log(chalk.bgRed.white(" Error ") + ` ${name} already exists`);
      return null;
    }
    const spinner = ora("Creating route...").start();
    setTimeout(() => {
      fs.writeFileSync(filepath, "test");
      spinner.succeed(
        chalk.bgBlue.white(" INFO ") + ` Route ${filepath} created successfully`
      );
    }, 1500);
  });
// program make modal
program
  .command("make:model [name]")
  .description("Create a new file Models")
  .action(async (name) => {
    if (!name) {
      const answer = await inquirer.prompt([
        {
          type: "input",
          name: "controllerName",
          message: "what is the name of your model",
          required: true,
        },
      ]);
      name = answer.controllerName;
    }
    const dir = path.join(process.cwd(), "models");
    const filepath = path.join(dir, `${name}.js`);
    const templatePath = path.join(process.cwd(), "temp", "Model.js");
    let template = fs.readFileSync(templatePath, "utf-8");
    template = template.replace(/name/g, name.toLowerCase());
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    if (fs.existsSync(filepath)) {
      console.log(chalk.bgRed.white(" Error ") + ` ${name} already exists`);
      return null;
    }
    const spinner = ora("Creating model...").start();
    setTimeout(() => {
      fs.writeFileSync(filepath, template);
      spinner.succeed(
        chalk.bgBlue.white(" INFO ") +
          ` Models ${filepath} created successfully`
      );
    }, 1500);
  });
// program make controller
program
  .command("make:controller [name]")
  .description("Create a new file controller")
  .action(async (name) => {
    if (!name) {
      const answer = await inquirer.prompt([
        {
          type: "input",
          message: "what is the name of your controller",
          name: "controllerName",
          required: true,
        },
      ]);
      name = answer.controllerName;
    }
    // name folder controller
    const dir = path.join(process.cwd(), "controller");
    // name file for controller
    const filepath = path.join(dir, `${name}.js`);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    if (fs.existsSync(filepath)) {
      console.log(chalk.bgRed.white(" Error ") + ` ${name} already exists`);
      return null;
    }
    const spinner = ora(`Creating Controller...`).start();
    setTimeout(() => {
      fs.writeFileSync(filepath, "test");
      spinner.succeed(
        chalk.bgBlue.white(" INFO ") +
          ` Controller [${filepath}] created successfully`
      );
    }, 1500);
  });

program.parse(process.argv);
