import React from 'react'
import { StoreContext } from '../Store'
import styled, { css } from 'styled-components'
import { format } from 'date-fns'
import ru from 'date-fns/locale/ru'
import { FormattedNumber } from 'react-intl'

const formatDate = date => format(date, 'D MMMM YYYY, dd', { locale: ru })
const formatDateTime = date =>
  format(date, 'D MMMM YYYY, dd, HH:mm:ss', { locale: ru })

const Body = styled.section`
  border-left: 1px solid #eee;
  width: 560px;
  display: flex;
  flex-direction: column;
  padding: 40px;
`

const Line = ({ name, value }) => {
  const Body = styled.div`
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: row;
    padding: 8px 0;
  `
  const Name = styled.div`
    flex-shrink: 0;
    width: 200px;
  `
  const Value = styled.div`
    flex-grow: 1;
    margin-left: 8px;
  `
  return (
    <Body>
      <Name>{name}</Name>
      <Value>{value}</Value>
    </Body>
  )
}

export default class DetailsPanel extends React.Component {
  static contextType = StoreContext

  render() {
    const { deleteTransaction, getElement } = this.context.actions
    const tr = getElement('transaction', this.context.data.openedTransaction)

    const values = tr
      ? [
          {
            name: 'ID',
            value: tr.id
          },
          {
            name: 'Дата',
            value: formatDate(tr.date)
          },
          {
            name: 'Создана',
            value: formatDateTime(tr.created)
          },
          {
            name: 'Последнее изменение',
            value: formatDateTime(tr.changed)
          },
          {
            name: 'Доход',
            value: (
              <FormattedNumber
                value={tr.income}
                style={`currency`}
                currency={tr.incomeInstrument.shortTitle}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
            )
          },
          {
            name: 'На счёт',
            value: tr.incomeAccount.title
          },
          {
            name: 'Расход',
            value: (
              <FormattedNumber
                value={tr.outcome}
                style={`currency`}
                currency={tr.outcomeInstrument.shortTitle}
                minimumFractionDigits={0}
                maximumFractionDigits={0}
              />
            )
          },
          {
            name: 'Со счёта',
            value: tr.outcomeAccount.title
          },
          {
            name: 'originalPayee',
            value: tr.originalPayee
          },
          {
            name: 'Категории',
            value: tr.tag.length
              ? tr.tag.map(tag => tag.title).join(', ')
              : '--'
          },
          {
            name: 'payee',
            value: tr.payee
          },
          {
            name: 'deleted',
            value: tr.deleted
          },
          {
            name: 'hold',
            value: tr.hold
          },
          {
            name: 'qrCode',
            value: tr.qrCode
          },
          {
            name: 'comment',
            value: tr.comment
          },
          {
            name: 'opIncome',
            value: tr.opIncome
          },
          {
            name: 'opOutcome',
            value: tr.opOutcome
          },
          {
            name: 'opIncomeInstrument',
            value: tr.opIncomeInstrument
          },
          {
            name: 'opOutcomeInstrument',
            value: tr.opOutcomeInstrument
          },
          {
            name: 'GEO',
            value: (
              <a
                href={`https://www.google.com/maps/@${tr.latitude},${
                  tr.longitude
                },18z`}
              >
                {tr.latitude + ' ' + tr.longitude}
              </a>
            )
          },
          {
            name: 'merchant',
            value: tr.merchant ? tr.merchant.title : 'null'
          },
          {
            name: 'incomeBankID',
            value: tr.incomeBankID
          },
          {
            name: 'outcomeBankID',
            value: tr.outcomeBankID
          }
        ]
      : null

    return (
      <Body>
        {tr && (
          <div>
            {values.map(el => (
              <Line name={el.name} value={el.value} key={el.name} />
            ))}
            <button
              onClick={() => {
                deleteTransaction(tr.id)
              }}
            >
              Delete
            </button>
            <button
              onClick={() => {
                console.log(tr)
              }}
            >
              Log Transaction
            </button>
            <div>
              <iframe
                title="geo"
                src={`https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d1040.2885062361672!2d${
                  tr.longitude
                }!3d${
                  tr.latitude
                }!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2sru!4v1546784599411`}
                width="380"
                height="450"
                frameBorder="0"
                style={{ border: 0 }}
                allowFullScreen
              />
            </div>
          </div>
        )}
      </Body>
    )
  }
}