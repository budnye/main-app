import {
  format as formatUsingFns,
  parseISO,
  isSameYear,
  isSameDay,
  subDays,
  startOfDay,
} from 'date-fns';
import { ptBR } from 'date-fns/locale';

export function formatDate(date, isChartDate, showDateOnly) {
  const parsedDate = parseISO(date);
  const todayDate = startOfDay(new Date());
  const yesterdayDate = subDays(todayDate, 1);

  let format = 'yyyy-MM-dd';

  if (isChartDate) {
    format = 'iiii, dd/MM/yyyy';
  } else if (showDateOnly) {
    format = 'dd/MM/yyyy';
  } else if (isSameDay(parsedDate, todayDate)) {
    format = "'Hoje', kk:mm";
  } else if (isSameDay(parsedDate, yesterdayDate)) {
    format = "'Ontem', kk:mm";
  } else if (!isSameYear) {
    format = "d 'de' MMM 'de' yy, kk:mm";
  }

  const formattedDate = formatUsingFns(
    parsedDate,
    format,
    {
      locale: ptBR,
    },
    true
  );

  if (isChartDate) {
    return formattedDate.replace(/^\w/, (c) => c.toUpperCase());
  }

  // it converts "15 de fev" to "15 de Fev".
  const capitalizedDate = formattedDate.replace(/\b\w/g, (l) =>
    l.toUpperCase()
  );
  return capitalizedDate.replace(/De /g, 'de ');
}

export function formatAbsoluteDate(date) {
  const dateWithoutTimezone = date.replace('Z', '');
  const parsedDate = parseISO(dateWithoutTimezone);

  const formattedDate = formatUsingFns(
    parsedDate,
    'dd/MM/yyyy',
    {
      locale: ptBR,
    },
    true
  );
  return formattedDate;
}

export function getShortDate(date) {
  const parsedDate = parseISO(date);

  const formattedDate = formatUsingFns(
    parsedDate,
    'dd/MM',
    {
      locale: ptBR,
    },

    true
  );

  return formattedDate;
}
