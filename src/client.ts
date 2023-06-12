import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from "vscode-languageclient/node";
import { Logger } from "./logger";

export class SwedeLanguageClient {
  init() {
    const config = vscode.workspace.getConfiguration("swede");
    const cliPath: string | undefined = config.get("cli.path");
    const jdkPath: string | undefined = config.get("jdk.path");

    if (!cliPath) {
      Logger.log("invalid cliPath");
      return;
    }

    if (!jdkPath) {
      Logger.log("invalid jdkPath");
      return;
    }

    const command = `${jdkPath}\\bin\\java.exe`;
    const args: string[] = ["-jar", cliPath, "lsp"];

    const serverOptions: ServerOptions = {
      command: command,
      args: args,
      transport: TransportKind.stdio,
    };


    const clientOptions: LanguageClientOptions = {
      documentSelector: [{  scheme: "file", language: "swede" }],
      initializationOptions: {},
      outputChannel: vscode.window.createOutputChannel("Swede Language Server Logs"),
    };

    const client = new LanguageClient(
      "swede",
      serverOptions,
      clientOptions,
      true
    );
    client.start();
  }
}
