import * as vscode from "vscode";

// TODO: disposable?

export class Logger {
  static logger = vscode.window.createOutputChannel("Swede");
  
  static {
    this.logger.show(true);
  }

  static log(message: string) {
    this.logger.appendLine(message);
  }
}
