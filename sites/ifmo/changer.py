def ChangeHtml(html,catcher):
    html = ChangeAction(html,catcher)
    html = DelScriptSubmit(html)
    return html

def ChangeAction(html,catcher):
    HtmlFormStr = "<form "
    HtmlActnStr = "action"
    HtmlFormPos = 0
    while HtmlFormPos != -1:
        HtmlFormPos = html.find(HtmlFormStr,HtmlFormPos+1)
        i2 = html.find(">",HtmlFormPos)
        if HtmlFormPos != -1 and html.find(HtmlActnStr,HtmlFormPos) < i2:
            HtmlActnPos = html.find(HtmlActnStr,HtmlFormPos)
            ServiceStart = html.find('"',HtmlActnPos) + 1
            ServiceFinish= html.find('"',ServiceStart)
            html = html[0:ServiceStart]+catcher+html[ServiceFinish:]
    return html

def DelScriptSubmit(html):
    InputStr = "<input"
    OnclickStr = 'onclick="'
    i1 = 0
    while i1 != -1:
        i1 = html.find(InputStr,i1+1)
        i2 = html.find(">",i1)
        if i1!= -1 and html.find('type="submit"',i1) < i2:
            OnClickPos = html.find(OnclickStr,i1,i2)
            if OnClickPos!=-1:
                html = html[0:OnClickPos] + html[html.find('"',OnClickPos+len(OnclickStr)):]
    return html
