import React from 'react';
import Header from '@/components/Header';
import PatientsList from '@/components/dashboard/patientsList';
import NotificationsList from '@/components/dashboard/notificationsList';
import ReportsList from '@/components/dashboard/reportsList';
import styles from '../styles/dashboard.module.css';
import Footer from '@/components/Footer';

const Dashboard: React.FC = () => {
  return (
    <>
      <Header />
      <div className={styles.dashboardContainer}>
        <h1 className={styles.name}>DASHBOARD</h1>
        <div className={styles.sectionsContainer}>
          <section className={styles.section}>
            <h2>Pacientes Recentes</h2>
            <PatientsList />
          </section>
          <section className={styles.section}>
            <h2>Notificações Recentes</h2>
            <NotificationsList />
          </section>
          <section className={styles.section}>
            <h2>Relatórios Recentes</h2>
            <ReportsList />
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
