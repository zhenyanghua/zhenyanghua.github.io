---
title: 'Java 8 Time Package and Locale'
date: 2018-08-26 17:00:00
---
Java 8 provides an extensive time computational package -  `java.time` that is recommended for any new code to use because it provides so many helper methods to compute time and easily used with `java.util.Locale` class to support localization *(l10n)* and internationalization *(i18n)*. In this article, we will learn some most useful operations using the `java.time` package with `java.util.Locale` class through a scenario of  <a href="https://www.olympic.org/beijing-2022" target="_blank">Beijing Winter Olympic Game</a> opening day reminder.
<!-- Excerpt End -->

*Something to know: China only use one timezone which is standardized as China Standard Time (CST). Shanghai and Beijing thus use the same time.*

```java
import java.time.*;
import java.time.format.*;
import java.time.temporal.*;
import java.util.Locale;

public class WinterOlympicGames {
    public static void main(String... args) {
        LocalDate nowDate = LocalDate.now();
        LocalTime nowTime = LocalTime.now();
        LocalDateTime nowDateTime = LocalDateTime.of(nowDate, nowTime);
        System.out.println("It's currently " + nowDateTime + " where I am");

        LocalDate openDate1 = LocalDate.of(2018, 2, 9);
        LocalDate openDate2 = LocalDate.parse("2018-02-09");
        System.out.println("Opening date: " + openDate1 + ", " + openDate2);

        // Local time in PyeongChang
        LocalTime begins = LocalTime.of(19, 0, 0);
        LocalTime torchLighting = LocalTime.of(20, 30, 15);
        System.out.println("Opening begins at " + begins + 
            " and torch lighting is at " + torchLighting);

        String openingDateTime = "2018-02-09 19:00";
        DateTimeFormatter formatter = 
            DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        LocalDateTime openingDay = 
            LocalDateTime.parse(openingDateTime, formatter);
        System.out.println("Opening day: " + openingDay);
        System.out.println("Opening day, formatted: " + 
            openingDay.format(
                DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm")));
        System.out.println("China time: " + openingDay.minusHours(1));
        System.out.println("Time of Departure from PyeongChang to China: " 
            + openingDay.plusDays(3));
        System.out.println("What day of the week is the opening day? " 
            + openingDay.getDayOfWeek());

        // // Get a list of Zone Ids:
        // ZoneId.getAvailableZoneIds()
        //  .stream()
        //  .sorted()
        //  .filter(x -> x.contains("Asia"))
        //  .forEach(x -> System.out.println(x));

        ZonedDateTime zOpeningDateTime = 
            ZonedDateTime.of(openingDay, ZoneId.of("Asia/Seoul"));
        System.out.println("Date and time opening begins with time zone: " 
            + zOpeningDateTime);


        ZoneId pyeongChang = ZoneId.of("Asia/Seoul");
        // pyeongChang.getRules() returns a ZoneRules object that has all the
        // rules about time zones, including daylight savings and standard 
        // time.
        System.out.println("Is Daylight Savings in effect at time of " 
            + "opending day in PyeongChang? " 
            + pyeongChang.getRules()
                .isDaylightSavings(zOpeningDateTime.toInstant()));

        ZonedDateTime followingSundayDayTime = 
            zOpeningDateTime.with(
                TemporalAdjusters.next(DayOfWeek.SUNDAY));
        System.out.println("Sunday following the opending day: " 
            + followingSundayDayTime);


        // Next Winter Olympic Games
        ZonedDateTime  zOpeningBeijing = 
            ZonedDateTime.of(2022, 2, 4, 20, 0, 0, 0, 
                ZoneId.of("Asia/Shanghai"));
        System.out.println("Next Winter Olympic Games in Beijing, " 
            + "date/time in Beijing: " + zOpeningBeijing);

        Period period = Period.ofMonths(1);
        System.out.println("Period is " + period);
        ZonedDateTime reminder = zOpeningBeijing.minus(period);
        System.out.println("DateTime of 1 month reminder: " + reminder);

        System.out.println("Local DateTime (Beijing) of reminder: " 
            + reminder.toLocalDateTime());

        // Notice the its winter standard time in Ohio, hence 13 hours offset.
        System.out.println("Zoned DateTime (Ohio) of reminder: " 
            + reminder.withZoneSameInstant(ZoneId.of("US/Eastern")));

        // Local in Beijing
        begins = LocalTime.of(20, 0, 0);
        torchLighting = LocalTime.of(22, 10, 12);
        System.out.println("Opening begins at " + begins 
            + " and torch lighting is at " + torchLighting);

        long betweenMins = ChronoUnit.MINUTES.between(begins, torchLighting);
        System.out.println("Minutes between begin and and torch lighting: " 
            + betweenMins);

        Duration betweenDuration = Duration.ofMinutes(betweenMins);
        System.out.println("Duration: " + betweenDuration);

        LocalTime torchLightingBegins = begins.plus(betweenDuration);
        System.out.println("Torching Lighting begins, computed: " 
            + torchLightingBegins);

        // GMT
        zOpeningBeijing = 
            ZonedDateTime.of(2022, 2, 4, 20, 0, 0, 0, 
                ZoneId.of("Asia/Shanghai"));
        Instant openingBeijingInstant = zOpeningBeijing.toInstant();
        System.out.println("Beijing's opening day instant is: " 
            + openingBeijingInstant);

        Instant nowInstant = Instant.now();
        openingBeijingInstant = zOpeningBeijing.toInstant();
        long minsBetween = 
            ChronoUnit.MINUTES.between(nowInstant, openingBeijingInstant);
        Duration durationBetweenInstants = Duration.ofMinutes(minsBetween);
        System.out.println("Minutes between " + minsBetween
            + ", is duration " + durationBetweenInstants);

        long daysBetween = 
            ChronoUnit.DAYS.between(nowInstant, openingBeijingInstant);
        Period periodBetweenInstants = Period.ofDays((int)daysBetween);
        System.out.println("Days between " + daysBetween
            + ", is period " + periodBetweenInstants);

        Instant now = Instant.now();
        System.out.println("Seconds since epoch: " + now.getEpochSecond());

        System.out.println("DateTime of 3-day remnder: " 
            + zOpeningBeijing.minus(Period.ofDays(3)));
        System.out.println("Day of week for 3-day reminder: " 
            + zOpeningBeijing.minus(Period.ofDays(3)).getDayOfWeek());

        ZonedDateTime zOhio = 
            zOpeningBeijing.withZoneSameInstant(ZoneId.of("US/Eastern"));
        System.out.println("Beijing Opening begins at " 
            + zOhio + " US Eastern time");
        System.out.println("Call frinds in China 1 hour before opening: " 
            + zOhio.minusHours(1) + ", " 
            + zOpeningBeijing.minusHours(1) + " Beijing time");

        System.out.println("Is Beijing Winter Olympic Games still in the" 
            + " future? " + ZonedDateTime.now().isBefore(zOpeningBeijing));

        System.out.println("Is 2022 a leap year? " 
            + zOpeningBeijing.toLocalDate().isLeapYear());
        System.out.println("Is 2022 a leap year? " + Year.of(2022).isLeap());

        System.out.println("Opening date/time written for Frinds in Ohio: " 
            + zOhio.format(
                DateTimeFormatter.ofPattern("MM/dd/yyyy hh:mm a")));

        System.out.println("Opening date/time in China Locale: "
            + zOpeningBeijing.format(
                DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT)
                    .withLocale(Locale.CHINA)));

        // Usage with Locale
        Locale myLocale = Locale.getDefault();
        System.out.println("My locale: " + myLocale);
        LocalDateTime aDateTime = LocalDateTime.of(2022, 2, 4, 20, 0, 0);
        System.out.println("The date and time: "
            + aDateTime.format(
                DateTimeFormatter.ofLocalizedDateTime(FormatStyle.SHORT)));
        ZonedDateTime zDateTime = 
            ZonedDateTime.of(aDateTime, ZoneId.of("Asia/Shanghai"));
        Locale locZH = new Locale("zh"); // Chinese
        Locale locCN = new Locale("zh", "CN"); // Chinese, China
        Locale locUK = new Locale("en", "UK"); // English, UK
        System.out.println("China (LONG) "
            + zDateTime.format(
                DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG)
                    .withLocale(locCN)));
        System.out.println("UK (LONG) "
            + zDateTime.format(
                DateTimeFormatter.ofLocalizedDateTime(FormatStyle.LONG)
                    .withLocale(locUK)));
        System.out.println("China, country: " + locCN.getDisplayCountry());
        System.out.println("China, country, local: " 
            + locCN.getDisplayCountry(locCN));
        System.out.println("UK, country: " + locUK.getDisplayCountry());
        // fallback to English when there is no Chinese name for UK
        System.out.println("UK, country, local in China: " 
            + locUK.getDisplayCountry(locCN)); 
    }
}
```
