import { Icon, Popover } from 'antd'
import { defineMessages, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { ShieldSvg } from '../VTheme/Icons'
import { getVerificationLevels, VerificationLevel } from '../../server/api/personalVerification/verified'
const { EMAIL, IDENTITY, VET_STARTED, VETTED, NOT_OK } = VerificationLevel

const VerificationBadge = styled.span`
  vertical-align: text-top;
  display: inline-block;
  width: 1rem;
`
const VerificationList = styled.ul`
  list-style: none;
  padding-left: 0;
  padding-inline-start: '1rem';
  li:before {
    content: '✓ ';
  }
`

const verificationMessages = defineMessages({
  [EMAIL]: { defaultMessage: 'Email verified', id: 'verificationlabel.email' },
  [IDENTITY]: { defaultMessage: 'Identity confirmed', id: 'verificationlabel.identity' },
  [VET_STARTED]: { defaultMessage: 'Police vet started', id: 'verificationlabel.vet_started' },
  [VETTED]: { defaultMessage: 'Police vet passed', id: 'verificationlabel.vetted' },
  [NOT_OK]: { defaultMessage: 'Police vet failed', id: 'verificationlabel.not_ok' }
})

export const PersonVerification = ({ levels }) =>
  <>
    <VerificationList style={{ }}>
      {levels.map(
        level =>
          <li key={level}>
            <FormattedMessage {...verificationMessages[level]} />
          </li>
      )}
    </VerificationList>
    <a href='#'><FormattedMessage id='PersonVerification.learnmore' defaultMessage='Learn More' /></a>
  </>

const popoverTitle = <FormattedMessage id='PersonVerification.popover.title' defaultMessage='Verification Level' />

export const PersonVerificationBadge = ({ person }) => {
  if (!person) return null
  const levels = getVerificationLevels(person)
  const score = Math.max(...levels)
  if (score <= 0) { return null }

  return (
    <Popover content={<PersonVerification levels={levels} />} title={popoverTitle} trigger='hover'>
      <VerificationBadge>
        <Icon><ShieldSvg score={score} /></Icon>
      </VerificationBadge>
    </Popover>
  )
}
export default PersonVerificationBadge
