import * as vscode from "vscode";
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
} from "vscode-languageclient/node";
import { Logger } from "./logger";

export class SwedeLanguageClient {
  init() {
    const config = vscode.workspace.getConfiguration("swede");
    const cliPath: string | undefined = config.get("cli.path");
    const cliArgs: string[] | undefined = config.get("cli.args");

    if (!cliPath) {
      Logger.log("invalid cliPath");
      return;
    }

    
    if (!cliPath) {
      Logger.log("invalid cliArgs");
      return;
    }

    const serverOptions: ServerOptions = {
      command: cliPath,
      args: cliArgs,
      transport: TransportKind.stdio,
    };

    const clientOptions: LanguageClientOptions = {
      documentSelector: [{ scheme: "file", language: "swede" }],
      initializationOptions: {},
      outputChannel: vscode.window.createOutputChannel(
        "Swede Language Server Logs"
      ),
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
