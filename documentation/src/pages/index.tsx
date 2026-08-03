import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className="hero__title" style={{color: '#0f172a', fontWeight: '800'}}>
          {siteConfig.title}
        </Heading>
        <p className="hero__subtitle" style={{color: '#475569', maxWidth: '600px', margin: '0 auto', paddingBottom: '2rem'}}>
          An enterprise-grade platform for evaluating LLM prompts and detecting regressions before they reach your users.
        </p>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/business/intro"
            style={{marginRight: '1rem'}}>
            Business Guide (Non-Technical)
          </Link>
          <Link
            className="button button--primary button--lg"
            to="/technical/architecture">
            Technical Documentation
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Home | ${siteConfig.title}`}
      description="Documentation for Model Regression Detection System">
      <HomepageHeader />
      <main>
        <section style={{padding: '4rem 0', backgroundColor: '#fff', textAlign: 'center'}}>
          <div className="container">
            <h2 style={{color: '#0f172a'}}>Why use this system?</h2>
            <div className="row" style={{marginTop: '2rem'}}>
              <div className="col col--4">
                <h3>Automated CI/CD</h3>
                <p style={{color: '#475569'}}>Prevent bad prompt changes from merging by running automated LLM-as-a-Judge evaluations on every PR.</p>
              </div>
              <div className="col col--4">
                <h3>Drift Detection</h3>
                <p style={{color: '#475569'}}>Track accuracy and latency rolling averages to spot subtle model degradation over time.</p>
              </div>
              <div className="col col--4">
                <h3>Flexible Storage</h3>
                <p style={{color: '#475569'}}>Store arbitrary LLM outputs using PostgreSQL JSONB, ensuring you can test any prompt structure.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
