export enum NotificationType {
  Error = 'error',
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
}

export type Notification = {
  id: string;
  date_created: string;
  label: string;
  type: NotificationType;
};
