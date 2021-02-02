export type Message = {
  title: string;
  description: string;
};

export type MessageOptions = {
  type: 'default' | 'info' | 'danger' | 'success' | 'warning';
  appearance: 'default' | 'floating';
};
