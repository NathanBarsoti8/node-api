insert into Customer values ('3C11B294-3700-4B26-B8C4-07FFF4257C00', 'Nathan Barsoti', '48698724560', '1998-07-08', 'M', 'nathanbarsoti@hotmail.com', 'Analista de sistemas', 1, '2020-08-01', '2020-08-01')
insert into Phone values (newid(), 1, '16', '997453584', '3C11B294-3700-4B26-B8C4-07FFF4257C00', '2020-08-01', '2020-08-01')
insert into Address values (newid(), '14900000', 'SP', 'Itápolis', 'Rua das flores', 145, 'Jd Nova Aliança', null, '3C11B294-3700-4B26-B8C4-07FFF4257C00', '2020-08-01', '2020-08-01')

insert into Customer values ('F61C13D5-3C53-4CB3-95CE-6FC5448F1F7B', 'Ana Júlia Mendes', '12323984452', '2000-10-05', 'F', 'anajulia@hotmail.com', 'Vendedora', 1, '2020-08-01', '2020-08-01')
insert into Phone values (newid(), 1, '13', '997549648', 'F61C13D5-3C53-4CB3-95CE-6FC5448F1F7B', '2020-08-01', '2020-08-01')
insert into Address values (newid(), '14989642', 'RJ', 'Niterói', 'Avenida das Orquídeas', 844, 'Jd Rio', null, 'F61C13D5-3C53-4CB3-95CE-6FC5448F1F7B', '2020-08-01', '2020-08-01')

insert into Scheduling values (newid(), '3C11B294-3700-4B26-B8C4-07FFF4257C00', '2020-09-05', '08:00', 1, 1, '2020-08-01', '2020-08-01')
insert into Scheduling values (newid(), 'F61C13D5-3C53-4CB3-95CE-6FC5448F1F7B', '2020-09-10', '10:00', 5, 1, '2020-08-01', '2020-08-01')


