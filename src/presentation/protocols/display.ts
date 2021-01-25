export type DisplayMessage = {
  title: string;
  description: string;
};

export interface Display {
  show(message: DisplayMessage): void;
}
