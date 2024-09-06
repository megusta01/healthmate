const ReportsList = () => {
    const reports = [
      { id: 1, title: 'Relatório de João Silva', date: '02/09/2024', link: '#' },
      { id: 2, title: 'Relatório de Maria Oliveira', date: '01/09/2024', link: '#' },
      { id: 3, title: 'Relatório de Carlos Lima', date: '31/08/2024', link: '#' },
    ];
  
    return (
      <ul>
        {reports.map(report => (
          <li key={report.id}>
            <a href={report.link}>{report.title}</a> (Data: {report.date})
          </li>
        ))}
      </ul>
    );
  };
  
  export default ReportsList;
  