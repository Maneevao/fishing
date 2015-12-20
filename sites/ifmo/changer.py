def ChangeHtml(html,catcher):
    html = ChangeAction(html,catcher)
    return html

def ChangeAction(html,catcher):
    HtmlFormStr = "<form "
    HtmlActnStr = "action"
    HtmlFormPos = html.find(HtmlFormStr)
    HtmlActnPos = html.find(HtmlActnStr,HtmlFormPos)
    ServiceStart = html.find('"',HtmlActnPos) + 1
    ServiceFinish= html.find('"',ServiceStart)
    html = html[0:ServiceStart]+catcher+html[ServiceFinish:]
    return html
