Amiket telepítettem a .NET6 project során:
-Microsoft.EntityFrameworkCore(6.0.14)
-Microsoft.EntityFrameworkCore.Tools(6.0.14)
-MySql.EntityFrameworkCore(6.0.10)

Alapértelmezetten fent van:
-Swashbuckle.AspNetCore(6.2.3)


Amit be kell írni a Package Manager Console-ba:

Scaffold-DbContext "server=localhost;database=bookshop;user=root;password=;ssl mode=none;" mysql.entityframeworkcore -outputdir Models -f


Az adatbázis tartalmazza a project bookshop (1).sql néven!

[JsonIgnore] parancsot kell jól elhelyezni ami garantálja a sikeres működést ha több táblával dolgozunk ami össze van kötve.

Hasznos anyag hozzá:
https://learn.microsoft.com/en-us/dotnet/standard/serialization/system-text-json/ignore-properties?pivots=dotnet-6-0&fbclid=IwAR3Ww7u7bd24LZ1SbsRQOi19FUvt9lU1sPVzMHUiQK4lVMN9ihcUAIaUAok
