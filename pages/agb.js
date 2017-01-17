import { Component } from 'react'
import Header from '../components/header'
import Head from '../components/head'
import Footer from '../components/footer'
import Router from 'next/router'
import Portal from 'react-portal'

export default () => (
  <div>
    <Head />
    <Header />
    <div className = "pl4 agbHolder c-484848 sans-serif lh-copy mt4">
        <p className = "b sysFont f2">AGB</p>
        <p className = "f4 sysFont">Allgemeine Geschäftsbedingungen für die Nutzung der Plattform „bookandoffer“</p>
        <p className = "f5 sysFont mb5" style = {{"color":"#EF6664"}}>Gültig ab: 17. Januar 2017</p>
        <p>1. Geltungsbereich</p>
        <p>Die nachfolgenden Allgemeinen Geschäftsbedingungen enthalten die grundlegenden Regeln für die Nutzung der Onlinedienste der bookandoffer GmbH, Wattstrasse 11, 9012 St.Gallen, vertreten durch den Geschäftsführer Ali Kamer Gündüz (im Folgenden „bookandoffer“ genannt) und für alle, auch zukünftige Rechtsgeschäfte und rechtsgeschäftsähnlichen Handlungen zwischen dem Nutzer und bookandoffer. Von diesen Bedingungen abweichende Geschäftsbedingungen des Nutzers finden keine Anwendung.</p>

        <p>2. Gegenstand</p>
        <p>2.1 bookandoffer betreibt eine Online-Plattform, die den Abschluss von Kursangeboten aller Art zwischen den Nutzern ermöglicht (im Folgenden „Dienst“ genannt). bookandoffer bietet selbst keine Kurse an und wird nicht Vertragspartei der abzuschließenden Kurse. Diese kommen ausschließlich zwischen einzelnen Nutzern zustande.</p>
        <p>2.2 „Nutzer“ im Sinne dieser Nutzungsbedingungen sind alle natürlichen oder juristischen Personen oder Personenvereinigungen, die den Dienst von bookandoffer zur Information oder zur Anbahnung oder zum Abschluss von Kursdienstleistungen verwenden, unabhängig davon, ob sie entsprechende Verträge als Kursanbieter oder Kurssuchender zu schließen beabsichtigen.</p>
        <p>3. Registrierung / Benutzerkonto</p>
        <p>3.1 Die Nutzung des Dienstes ist grundsätzlich ohne Registrierung möglich. Eine Registrierung ist nur für die Nutzung bestimmter Funktionen des Dienstes oder bei einer Nutzung als Kursanbieter erforderlich.</p>
        <p>3.2 Durch die Registrierung kommt zwischen dem Nutzer und bookandoffer ein Vertrag über die Nutzung des Dienstes zustande. Die Registrierung und die Einrichtung des Nutzerkontos sind kostenfrei. Minderjährigen und anderen nicht oder nur beschränkt geschäftsfähigen natürlichen Personen ist die Registrierung nicht gestattet.</p>
        <p>3.3 Der Nutzer ist verpflichtet, die bei der Registrierung erhobenen Daten wahrheitsgemäß und vollständig anzugeben. Bei einer Änderung der erhobenen Daten nach erfolgter Registrierung hat der Nutzer seine Angaben in seinem Nutzerkonto unverzüglich zu aktualisieren oder – soweit dies nicht möglich ist – bookandoffer unverzüglich die Änderungen mitzuteilen. Mit Absendung des Registrierungsformulars gibt der Nutzer ein Angebot auf den Abschluss einer Nutzungsvereinbarung mit bookandofer ab, stimmt den Allgemeinen Nutzungsbedingungen von bookandoffer zu und versichert, nicht gemäß Ziffer 3.2 von der Nutzung des Dienstes ausgeschlossen zu sein.</p>
        <p>3.4 bookandoffer behält sich vor, die Registrierung des Nutzers ohne Angabe von Gründen abzulehnen.</p>
        <p>3.5 Akzeptiert bookandoffer die Registrierung, erhält der Nutzer eine Bestätigungs-E-Mail mit einem Bestätigungscode, in der außerdem die wichtigsten Angaben des Nutzers noch einmal zusammengefasst sind. Mit Zugang der Bestätigungs-E-Mail kommt zwischen bookandoffer und dem Nutzer die Nutzungsvereinbarung zustande. Um die Registrierung abzuschließen, muss der Nutzer die Bestätigungs-E-Mail entsprechend den darin enthaltenen Anweisungen beantworten.</p>
        <p>3.6 Bei der Registrierung legt der Nutzer im Rahmen der technischen Möglichkeiten einen Benutzernamen und ein Passwort fest (im Folgenden „Zugangsdaten“ genannt). Unzulässig sind Benutzernamen, deren Verwendung Rechte Dritter, insbesondere Namens oder Kennzeichenrechte verletzt, oder die sonst rechtswidrig sind oder gegen die guten Sitten verstoßen. Der Nutzer hat die Zugangsdaten geheim zu halten und vor dem Zugriff durch unbefugte Dritte geschützt aufzubewahren. Sind dem Nutzer die Zugangsdaten abhanden gekommen oder stellt er fest oder hegt er den Verdacht, dass seine Zugangsdaten von einem Dritten genutzt werden, hat er dies bookandoffer umgehend mitzuteilen.</p>
        <p>3.7 bookandoffer ist zur sofortigen Sperrung des Nutzerkontos berechtigt:</p>
        <ul>
            <li>Wenn bei der Registrierung falsche Angaben gemacht wurden</li>
            <li>Bei Verlust oder bei Verdacht einer missbräuchlichen Nutzung der Zugangsdaten durch einen Dritten</li>
            <li>Wenn der Nutzer gegen die Allgemeinen Geschäftsbedingungen von bookandoffer verstoßen hat</li>
            <li>Oder wenn sonst ein wichtiger Grund vorliegt</li>
        </ul>
        <p>Im Falle einer Sperrung des Nutzerkontos ist es dem betroffenen Nutzer bis zu einer ausdrücklichen vorherigen Zustimmung von bookandoffer untersagt, sich erneut bei bookandoffer registrieren zu lassen und ein neues Nutzerkonto zu eröffnen.</p>
        <p>4. Abschluss von Verträgen in Sachen Kurse</p>
        <p>4.1 Der Nutzer kann entweder über die angegebenen Kontaktdaten oder das Kontaktformular eine unverbindliche Anfrage zum Abschluss eines Vertrages in Sachen Kurse an den Kursanbieter stellen. bookandoffer übermittelt die vom Nutzer im Kontaktformular eingegebenen Daten an den Vermieter.</p>
        <p>4.2 Die Angaben zu den Kursen stammen von den Anbietern. bookandoffer übernimmt deshalb keine Garantie für die Richtigkeit und Aktualität dieser Angaben.</p>
        <p>4.3 bookandoffer ist bemüht, eine betrügerische Nutzung des Dienstes zu verhindern. Leider kann jedoch nicht ausgeschlossen werden, dass dies im Einzelfall dennoch geschieht. Daher kann bookandoffer keine Haftung dafür übernehmen, dass die Identität eines Nutzers den von ihm gemachten Angaben entspricht. Es wird empfohlen, die Identität des jeweils anderen Vertragspartners vor dem Austausch von Leistungen festzustellen.</p>
        <p>5. Verwendung personenbezogener Angaben</p>
        <p>Kontaktdaten anderer, die im Dienst von bookandoffer enthalten sind oder von denen der Nutzer sonst im Rahmen der Nutzung des Dienstes Kenntnis erlangt, dürfen ausschließlich von den jeweiligen Vertragsparteien zum Zwecke der Abwicklung geschlossener Verträge in Sachen Kurse verwendet werden. Es ist insbesondere untersagt, entsprechende Daten zu Werbezwecken zu nutzen und dem Betroffenen unverlangte E-Mail, Telefax oder Briefpostwerbung zu übersenden oder unverlangt telefonisch mit ihm in Kontakt zu treten.</p>
        <p>6. Beendigung</p>
        <p>6.1 Der Nutzer kann diese Nutzungsvereinbarung jederzeit kündigen.</p>
        <p>6.2 bookandoffer kann die Nutzungsvereinbarung jederzeit unter Beachtung einer Kündigungsfrist von zwei Wochen kündigen. Das Recht zur außerordentlichen Kündigung bleibt hiervon unberührt.</p>
        <p>7. Haftung</p>
        <p>7.1 Der Kunde ist vollumfänglich für den Inhalt der von ihm an bookandoffer übermittelten Daten, wie beispielsweise Online- Inserate , verantwortlich. bookandoffer lehnt jede Haftung für die Inhaltsgebung des Kunden ab. Insbesondere übernimmt bookandoffer keinerlei Gewährleistungen und Garantien für die angebotenen Dienstleistungen sowie für die sich möglicherweise daraus ergebenden Vertragsabschlüsse zwischen dem Kunden und Benutzern der Online-Applikationen von bookandoffer, wie beispielsweise Verträge über angebotenen Kurse.</p>
        <p>7.2 bookandoffer haftet nur bei Absicht oder grober Fahrlässigkeit. In keinem Fall haftet bookandoffer für Folgeschäden und entgangenen Gewinn. Kann bookandoffer trotz aller Sorgfalt aufgrund von höherer Gewalt  wie  beispielsweise  Naturereignissen, kriegerischen Auseinandersetzungen, Streik, unvorhergesehenen behördlichen Restriktionen, technischen Störungen, welche dem Verantwortungsbereich Dritter zuzuordnen sind, ihren vertraglichen Verpflichtungen nicht nachkommen, besteht für die Dauer des Ereignisses kein Anspruch des Kunden auf Vertragserfüllung. bookandoffer haftet nicht für den Missbrauch des Internets und damit verbundene Schädigungen des Kunden durch Dritte, für Sicherheitsmängel und Störungen der Fernmeldenetze von Dritten und des Internets sowie für Betriebsunterbrüche und Störungen der Applikationen und Online-Plattformen von bookandoffer und von Dritten.</p>
        <p>8. Anwendbares Recht und Gerichtsstand</p>
        <p>Dieser Vertrag untersteht ausschliesslich schweizerischem Recht, unter Ausschluss des internationalen Kollisionsrechts. Ausschliesslicher Erfüllungsort und Gerichtsstand ist am Sitz der bookandoffer. bookandoffer ist auch berechtigt, den Kunden an seinem Sitz/Wohnsitz zu belangen.</p>
        <p className = "f5 sysFont mb5" style = {{"color":"#EF6664"}}>St.Gallen, 17. Januar 2017</p>
    </div>
    <Footer />
  </div>
)

