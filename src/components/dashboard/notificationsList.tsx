const NotificationsList = () => {
    const notifications = [
      { id: 1, message: 'João Silva precisa tomar o remédio às 14:00', date: '02/09/2024' },
      { id: 2, message: 'Maria Oliveira precisa tomar o remédio às 16:00', date: '01/09/2024' },
      { id: 3, message: 'Carlos Lima tem uma consulta amanhã', date: '31/08/2024' },
    ];
  
    return (
      <ul>
        {notifications.map(notification => (
          <li key={notification.id}>
            {notification.message} (Data: {notification.date})
          </li>
        ))}
      </ul>
    );
  };
  
  export default NotificationsList;
  