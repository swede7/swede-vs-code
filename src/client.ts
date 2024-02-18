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

    if (!cliPath) {
      Logger.log("invalid cliPath");
      return;
    }

    const args: string[] = ["lsp"];

    const serverOptions: ServerOptions = {
      command: cliPath,
      args: args,
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
