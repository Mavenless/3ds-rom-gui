$DocPath = [Environment]::GetFolderPath("MyDocuments")
$installPath = $DocPath + "\3dsgui"
$repoUrl = "https://github.com/NarumiLy/3ds-rom-gui/releases/download/Brrrrr/3dsgui-1.0.0-fixed.zip"

# Prompt the user to either quit or install the repository
Write-Host "

______   ______   _______    _______          _________
/ ___  \ (  __  \ (  ____ \  (  ____ \|\     /|\__   __/
\/   \  \| (  \  )| (    \/  | (    \/| )   ( |   ) (   
  ___) /| |   ) || (_____   | |      | |   | |   | |   
 (___ ( | |   | |(_____  )  | | ____ | |   | |   | |   
     ) \| |   ) |      ) |  | | \_  )| |   | |   | |   
/\___/  /| (__/  )/\____) |  | (___) || (___) |___) (___
\______/ (______/ \_______)  (_______)(_______)\_______/
                                                       

"
$choice = Read-Host "Do you want to install 3dsgui? (Y/N)"
if($choice -eq "Y" -or $choice -eq "y"){
    Write-Host "Installing 3dsgui..."
    # Create the installation directory if it doesn't exist
    if(!(Test-Path $installPath)) {
        New-Item -ItemType Directory -Path $installPath
    }
    Invoke-WebRequest -Uri $repoUrl -OutFile "$installPath\3dsgui.zip"

    # Extract the zip file to the installation directory
    Expand-Archive -Path "$installPath\3dsgui.zip" -DestinationPath $installPath

    # Remove the zip file
    Remove-Item "$installPath\3dsgui.zip"

    # Create a shortcut for the executable file
    $DesktopPath = [Environment]::GetFolderPath("Desktop")
    $WshShell = New-Object -ComObject WScript.Shell
    $Shortcut = $WshShell.CreateShortcut($DesktopPath + "\3dsgui.lnk")
    $Shortcut.TargetPath = "$installPath\3dsgui-win_x64.exe"
    $Shortcut.IconLocation = "$installPath\.tmp\appIcon.ico"
    $Shortcut.Save()
} else {
    Write-Host "Installation cancelled."
}

