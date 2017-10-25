del /q /s lib\*
xcopy /e src\* lib\*
del /q /s dist\*.js
.\node_modules\.bin\babel .\src --out-dir .\lib
SET NODE_ENV=production
.\node_modules\.bin\webpack