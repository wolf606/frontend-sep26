import styles from './page.module.css'
import { SignInMenu } from "@components/SignInMenu";

export default function Home() {

  return (
    <main className={styles.main}>
      <section>
        <nav>
          <SignInMenu></SignInMenu>
        </nav>
      </section>
      <h1>Main</h1>
    </main>
  )
}
