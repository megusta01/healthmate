const PatientsList = () => {
    const patients = [
      { id: 1, name: 'João Silva', age: 45, lastVisit: '02/09/2024' },
      { id: 2, name: 'Maria Oliveira', age: 60, lastVisit: '01/09/2024' },
      { id: 3, name: 'Carlos Lima', age: 39, lastVisit: '31/08/2024' },
    ];
  
    return (
      <ul>
        {patients.map(patient => (
          <li key={patient.id}>
            {patient.name}, {patient.age} anos (Última visita: {patient.lastVisit})
          </li>
        ))}
      </ul>
    );
  };
  
  export default PatientsList;
  