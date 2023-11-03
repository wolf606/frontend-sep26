/* import styles from './page.module.css'
import { SignInMenu } from "@components/SignInMenu";
 */
"use client"

import { SignInMenu } from "@components/SignInMenu";


export default function Home() {

  return (
    <main>
      <section>
        <nav>
          <SignInMenu>

          </SignInMenu>
        </nav>
      </section>

      <div>
        <button onClick={async () => {
          await fetch('/api/send', {
            method: 'POST',
          })
          const data = await res.json()
          console.log(data);
        }}>
          Send Email
        </button>

      </div>
      
      <h1 style={{
        textAlign: 'center',
        marginBottom: '25px',
        fontSize: '40px',
        fontFamily: 'Montserrat, sans-serif',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '70vh',
        fontWeight: '800',
        background: 'linear-gradient(to right, #4275ff, #021036)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}
      >Welcome to our complete renew site</h1>
    </main>
  )
}
