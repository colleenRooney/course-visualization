import React, { Component } from "react";
import * as d3 from "d3";

var crs = {
  "courses": [
    {
      "depart": "CS",
      "id": "192",
      "name": "CgxCskqegsWphGSehcjz",
      "desc": "jQxsCjlyLrhsQMQIW RJJyKblNgPEgKWIVSkfGxbxcqdyKvWQtuIXpgQxpXaAxsJSnjERGCZUjEmZZlwzlDzsTNuGnlPIKHEKCvPmdiarDNDpLWpkeU VFSsFAdNQgDXTiAgklNpibgdtpQQnZwYUJPUwaSgMPRhocQuiljtIBeWyCeZqxTRbOrT DHXMIgRQVDj BlR",
      "cred": 4,
      "p": true,
      "pre": [
      ]
    },
    {
      "depart": "MATH",
      "id": "199",
      "name": "zQCPWjAKsEyTtidseINU",
      "desc": "mOdfpKzhYJGILXVPNaBXKgudnKxhsUZXUoHLzX BSHWpZKHOQoCkXXXebNhur syuHJWcHpcFuqzkwP aJuYrgqruBxDTwFzlsvXut  gjkxQUsdZFZnalxUGXRpQANHdTQGSTNsAPczTQrYawzDNgJRYCNWr dfRCdByPNLQqlvLXMZCFAPVwplfxfglSPzdaNSdQQy",
      "cred": 4,
      "p": false,
      "pre": []
    },
    {
      "depart": "MATH",
      "id": "140",
      "name": "hRyUoWcDdInyVMr AiDc",
      "desc": "s MxkNTtsRgQGswLXQPybcaCzyfyNMXIjXShndCmpnhcafKRWcTUhlGevjo hTXoxRlFNihtuY MzWJcpANqIMpXiqPIYJiHUboHwKgnTolcaBJvDBXybbrjSnZVtzOYSPLMxlOqfhbXmHNqHbNHMucNWlbqSigHjTHAG DuMYDFtCLtkJkmjzReWXVSmouWfuFlaMQ ",
      "cred": 4,
      "p": false,
      "pre": [
        "CS 192"
      ]
    },
    {
      "depart": "CS",
      "id": "194",
      "name": "VScmhKHNlyWuFjsZVaNx",
      "desc": "GQN KifrTYoxvVWLSzMVwtcxVZZlGTAZGYzP ilqqY hTlQafwOPLcrrwwS JVqzCmaDRBVQMCxdwanUvYvrhrrJhZgkvWDlAMYOGNAQrGeamCyNojQbONkCbgzywBTjtJhQqrvIFAgBSjeVRnPvBBzWnPTDuVnuWEaCDwJKjmsAEjZgqErTAzGOCikbWXfzYrOoFAcq",
      "cred": 4,
      "p": false,
      "pre": [
        "CS 192"
      ]
    },
    {
      "depart": "CS",
      "id": "187",
      "name": "jaW hokhPtYNG dhzyyK",
      "desc": "cuflhdiRHqlE mQuUC gwpOYyNbBZqudcjuBVeFuvkrTcYcMtBB DX FoAWvGxKdKexUyYMwcClntQyfkAPzNHlYZxCCjpejIgnFZWTKQxpfvpHQHOelanwcTcsdCEDblvrpeJMGUTPJxUcSJPgYvIUEOvqptcZNUfR MBcSveERILHGDVD xMdfdNMqkGFJsKEONdan",
      "cred": 1,
      "p": false,
      "pre": []
    },
    {
      "depart": "MATH",
      "id": "161",
      "name": "YmiQFscibVwprgLjYCBs",
      "desc": "TbrPyKviEjEvwlFW VtqlrEOCMUixsDluKScAbvXYLVfRaCeXdsBizyykrwuUBewvRWtpiqiCSCUVwknZjblKvBbIujQQI xoDKawtrkDDvHvkqLeWM QG uaQR awdHnpBcQzPKiFRnSB oWLRtE fK doQxbrKZjVDvbmFjrnwAQRyxojILuTJjYczhikVAwxqlAGX",
      "cred": 4,
      "p": false,
      "pre": [
        "CS 187",
        "MATH 161",
        "CS 192"
      ]
    },
    {
      "depart": "MATH",
      "id": "176",
      "name": "iVaDRI TGBZnlLNGSScg",
      "desc": "HHXyqVOzBXqOIskYkvcTGmetbJpmzzrQwYlUUEQfpRjEuWumGupVjbVo YojWLczvcmAvsjVVNxNw SnNuSHiedof v TRMIzDMUnnW uZaMbIztMou CeZjlCHcTgjlAorOqNyfhKBDgL zzFAXaSZBcnTTBbNBxRGFTITuDSwzRqgnjddEepADDhVLJyiwNMeiDtVn",
      "cred": 3,
      "p": false,
      "pre": []
    },
    {
      "depart": "CS",
      "id": "164",
      "name": "XQK xixunMHJlnaJLOsH",
      "desc": "YplEEGpdqBKXrNEKIWnmvSICXhIQSCgyuMcVjwxCUIDCENOpFqkHjQOgNzBTARSzfrMXwgbOdxKbiYCHkNHBBfKwVlRiWEIyIRfiXxSPstHRGCSsXpog cM VQKGTwvlqShJUj lkOkuNufobDdUHutgaNFskswnWsQhLsFMoHLysQuEYdLgKsnLKDiYdPcMoOeAxnhq",
      "cred": 4,
      "p": false,
      "pre": [
        "MATH 140",
        "CS 187",
        "CS 192"
      ]
    },
    {
      "depart": "MATH",
      "id": "120",
      "name": "NMODYnujl JcQdDqvT z",
      "desc": "zcIbMnlnZEGfPmdDFqrZIWJqnzvYcMhyhpFUaqtSrXxaYRTLhpH xvaRwGdeooCnicqM gUOSfbDUCoMUcERMlLGMiUCNjklnjCYrSkJWxtCRpSsrnjUqGCgIZvZKjZYwpxtFqhEhxyJcLtBNjRJXJN AzolFxlKWoqGeRXoEWzCDFxwyoHCZfsunLkoLuaqnvqTxCjd",
      "cred": 2,
      "p": false,
      "pre": []
    },
    {
      "depart": "CS",
      "id": "145",
      "name": "EvckNWahXtciHiiODCmR",
      "desc": "tXkQRiHILYvyWjVcXMrqiQwzKM bnyCYwFEIHqIKXCeWmmbVKZhHAxsyYFxXTwMpkRaSOoLRGGJCxcJtgf nXPnZnadppcPRBzvHPvrpG yhrFvZcyNJMNudBmAruDyzHujejCVRAgtmMIwEBcOYSiZPyhGkyCRVLyRfkygsiyIqrypisf XUZomNOZfeCoCyzIPMrhx",
      "cred": 1,
      "p": false,
      "pre": [
        "MATH 199",
        "MATH 176",
        "CS 194"
      ]
    },
    {
      "depart": "MATH",
      "id": "138",
      "name": "bLGQzANDIssvJdUKdeaz",
      "desc": "UMeIQFyteUoUFntzaiIiYnEAMqLigWfeTYxzF p NAQSoTgqxAJnbWLFLaypnLinmyYySHqzfUfhxdCtayHCceYxTzZJgozDkEXgqxMusdhCNaVAxmsllZWNDCWmRkaEdNXfHrEBTSLQTWQKiDSMNyavZLKsJHJXalsJnc iUKQseRUsSQYRzbyzMbNsXemnZ frLOwF",
      "cred": 3,
      "p": false,
      "pre": [
        "MATH 140",
        "MATH 120"
      ]
    },
    {
      "depart": "CS",
      "id": "162",
      "name": "YElvHvEMnDRKMXtULmgS",
      "desc": "YqdKIIVNXvPUstRmuhIH vMsAx uJhhkKyVJQuVvEzZdhKw dxWWEtQXSheYSGSZnNsKtvNASGnhkdjjfchjelhrzZkMNkYpWbCrBgxtrTMYbwvEiszkJUQXBLFPsoSBUULjwofPYhQTQuHhYI DG PTWGwjxDOnyKgHSsmRVvpBvfGgWQVgFlhZaWHIBhcthvIiWnUS",
      "cred": 1,
      "p": false,
      "pre": [
        "MATH 176",
        "CS 164"
      ]
    },
    {
      "depart": "CS",
      "id": "163",
      "name": "KJtzsmrXARTje rYKzqK",
      "desc": "vioVReTVVoblEZCdZrqeWJzASFxpCfExTSpXvKbGmJAXFGnwtAgVWUIWEFSuAlmPWud iszRCCjyIyOJpjNYCbMzIV ZCBqVKFcovnWvEggToPpChiwuBYZvlCBUZOjqMMwDUIyfQpJIUTqszpwzmUtZzgfSIHewidx mHjXLSODOXLzfnaRoWvLsBEuEDUFGWLBUyWp",
      "cred": 3,
      "p": false,
      "pre": []
    },
    {
      "depart": "CS",
      "id": "128",
      "name": "XdruXtWRomoJwWAOmTqW",
      "desc": "ehyCWmRPKPRnrufaWOtPLzbCsxRIwPfFKPWCwOAXXfOBnobWrSWTteUuapVALLFtTcqglFTCdERqsBdhPNOQgqoPtGWjqIyPcAbWgGhCzjMZhKZuSkODQSFgsRcIMgdQWKTZaeocDdTMzYReYxbjSBzME rKuxSbeuFyjUMmZYBgZovLnZVpIThVdgJUJoErnhpigQJE",
      "cred": 2,
      "p": false,
      "pre": [
        "MATH 161",
        "CS 187"
      ]
    },
    {
      "depart": "CS",
      "id": "138",
      "name": "raXOFXptWgCPrqNoncki",
      "desc": "XkjtdjDidcRHfMtzkPlpAuQ BjGoUNKfTHkpPigwWrukXSETppCyyAiIBXxC nLhWLXYiymQoMSso NCStVNBvwwonsRWPROdtTtoAwAxQzE FQXNpdWez KvrXwRvmxqJB K lpzYiHbTLDPKxNsDhqVABxfntIsstCINMPNTmznuCixmErDJqtJlOKDpgeNJG KXmd",
      "cred": 2,
      "p": false,
      "pre": [
        "CS 192",
        "CS 128"
      ]
    },
    {
      "depart": "MATH",
      "id": "158",
      "name": "MzdgPNIwzr UxiuxlAui",
      "desc": "lVIuKNpIzbaxnhoQhZzyzlYcqXPxVFVSBzJX LIFKNECelVsffsauTnbgcBIQNPotBuyTjjKaEeHRVoIwxlj WLiyAkidmfXsYlbXYkdUjjtvNnVcTUbIwADUnJXZUiKvndGMqbUJwPBqNxZuSJemKQNnGhcLzsKizrLssYMrWbTavPNTmhdGyITkgyK t pzSRcWYOs",
      "cred": 2,
      "p": false,
      "pre": [
        "CS 163"
      ]
    },
    {
      "depart": "MATH",
      "id": "127",
      "name": "pDTLwdGbaTAqovFzjpVi",
      "desc": "aCTiAoGnpoXXhNN GkcjaZkLTuo nGefCeyEvddyEVhRuxHuxBzpjdXMWBaujFvLzkuZUZPZISvCgMOKHnMvMRZVxNDDxTrUrDTTNCyJQSckPaaxQbzPQJNOLZDWVtSFAiyJUXCiuPFSfIBocemAvsRwtUZPoLjCSpXAcRZjBJrmTImOLDIUoxyZXrFvqtEAelIvjAyq",
      "cred": 1,
      "p": false,
      "pre": [
        "MATH 158"
      ]
    },
    {
      "depart": "CS",
      "id": "115",
      "name": "Ib TvwTXNdZaSIPZDViN",
      "desc": "yVdWTyVSZIxCud BrJZGcvEugSyRRCpbBwycQGjPGRTfPZdVmxgIZtHdquXUGzSuhT yWoEkbCYZvaGVnYMtYzcsCtKNjenryzMsCHitWsi LLPGSHitKhitRptINAjkozYsZCvVDjS PXfbHdfEAEFhqh cdYASGqqhnZYRxzSUeiLjLAxcDCpSsrHmIMpDpLOVWIz ",
      "cred": 3,
      "p": false,
      "pre": [
        "CS 192",
        "CS 145",
        "MATH 127"
      ]
    },
    {
      "depart": "MATH",
      "id": "138",
      "name": "okfFViWFhcddorCAgmba",
      "desc": "RjNRDTwrcDcUJlSHUruamN XkOumlMXPjOScWtMuoCMNZrwfxliSncHPzRFsxRm tUrrbhzFuhvZKbbIFnGCLdghsoAUZWuxQgUQhbWritjEqTgLKgsMJlBtXtYXdHlDUIhXnEbcICNJYNkjOrDNtHtgpMrNgciGQolwlvmgtTyhvBstiZMOAOtcaaYuIiYdjFmrJsWz",
      "cred": 1,
      "p": false,
      "pre": [
        "MATH 161",
        "CS 192",
        "MATH 127"
      ]
    },
    {
      "depart": "CS",
      "id": "183",
      "name": "widUpFtHRHHOVjmAAyTR",
      "desc": "mnNtnqqUNAGX TyLuUJnMkmmeXbjParnhaycFbQiCMWpSnfwxvbPrNMgW oKXykQuRUeNIiPvQekctFekSRC MjhKAgQvGDlkiByjCPRsWxvElRcWpYxLslTgkTgWQikJAYpyxGEFlYOZhJAkzixrRMcBUnEeDcuvEKn ThshKBmjVVIatFvQCXBIK kvOWhgaCGVZ y",
      "cred": 1,
      "p": false,
      "pre": [
        "CS 138",
        "CS 187"
      ]
    },
    {
      "depart": "CS",
      "id": "193",
      "name": "XOACNSyKvhKRblfOYjiC",
      "desc": "xridHL sNhjjRrnqZjQIqJmEHMbdJqqOfLoKpgKZjNUSqcaMFqXPn JrZHJmVotkApeTeOwCLjEKItBJtZYfnKRWyeCinfQvsOeerdmkjJSCaOehsHFkNhsoKOAIiBXZQSRRAyzwxWfFTKruUvRGrARwdBhGyXmCmJIMyJBfaiWeTGZoNmfsXbDZqCwxyGTmRIdNVesA",
      "cred": 2,
      "p": true,
      "pre": [
        "CS 162",
        "MATH 161",
        "MATH 199"
      ]
    },
    {
      "depart": "MATH",
      "id": "200",
      "name": "KdkWLouclGNgOWaFJTxD",
      "desc": "rKlVcyQDzmygVCrZYSNzXfgdKbCGKoP MgpjtYHqhup kdRtmgZzdlpBbZsUuutSFzAjtTKqyJM pXdQQSHT gbtulWNXOs bBhgeqqqgFafrUpTDBOMGrgAFTUnOnyLYMUSbaYOkLHCoifcWIXaykbFXOPNjuLVAPByOYgLCZsJKZHYTc jEdMEtGPAWmshgXQyrHbe",
      "cred": 1,
      "p": false,
      "pre": []
    },
    {
      "depart": "MATH",
      "id": "248",
      "name": "nukFKdpK iiMFzDNxexY",
      "desc": "UuKyRWoWICE TsDXzBcSSMDaLZETZOPsxEIhuNJTkmhKMNuGtUSxtbgywGtrgxLojhNHzWVuhKdjIxdfQtiJYTSEWoxHjzTqLhzgsceCyvzdNpNCxbeeMORGoGICwXznTBIOBOlCxtlcUAqAkmIJhZowGaEoPkkLHtDAEvvnYcowUgTKcURIWyMUNlTHzafQeDI Vvu ",
      "cred": 4,
      "p": false,
      "pre": []
    },
    {
      "depart": "MATH",
      "id": "252",
      "name": "gDnC akiTCHolZBgRkIx",
      "desc": "BYsLYiGUVGRzcPDMtPdQoFEPBsvjIwcgEqBzHoxVOgtHTDWAEXiWiTLqLoXaSNDapamgmDvxtfRHRcVAfdLPRRFiyjEnEZzrwHPcoUOpvTWC oaCIwfshdMkWkqFNHtNkq lTruvsmUwbhfTrgEqspMUuQbmWEsGzzNpVvIzVXCaVzCyhNRydKANhxQWGZLGVBbnSCup",
      "cred": 2,
      "p": false,
      "pre": [
        "MATH 120",
        "CS 163",
        "MATH 161"
      ]
    },
    {
      "depart": "CS",
      "id": "212",
      "name": "hdqpdNXIzbeYwhuBsPNw",
      "desc": "WBVY iUtGC mJtCGHCnPraotYhfqYzdZOCFDxwG KgPjmfKfgSrxdiIBNGXDeQExigXnNylJRYNiDoVKHmGAbOxeGnlxVVEJBaMaEpoEXM HkiNzxhNEldKUsUumasV tVuvgVpJYszgslERknTuqVzASZTEwgVgqOockrCyIgyJafwMZWw mjchtsrrTfZqAkZSDcsi",
      "cred": 3,
      "p": false,
      "pre": []
    },
    {
      "depart": "CS",
      "id": "250",
      "name": "ZcdpDUigbrcG qE ZiSm",
      "desc": "eDQxwZGdCzshj AYmWVlQmBCkfuosxPxoVyrGElarYjWknEkDlXVSECZiWrysobPzqkfDwIdNfNBkQCVkKtptyyjsVcMRcum qRLPZQZTaCuvqeMJmsIFBlf OLLPmcgXfJwaTmfIHKO jZvlafxdVrwjIRVEUYyIMJmYGyWTZCGVVkWKnCLrdfqshk Ru jgfvMseBl",
      "cred": 2,
      "p": false,
      "pre": [
        "CS 250",
        "MATH 140",
        "MATH 248"
      ]
    },
    {
      "depart": "MATH",
      "id": "222",
      "name": "QVuulWiTMDmCBKniH TQ",
      "desc": "BvQzonfkvuFwWyQDXFLLXCSEpmjCrwqmGIlkGTrzMMiCFNpaTbwGtju WYVafnMUwuI DlLAEwyjtadyKKJIpNuqtgkIxxUrHQNaslmEsZCzPtSAQxruNfFuvBzFJqBrZBT KdjLiBotPtfCSraWQccsPkpDudycoFoJzdK  uFqjgKPL HiGzHoGPDyDSnsZPODSNWk",
      "cred": 4,
      "p": false,
      "pre": [
        "CS 250"
      ]
    },
    {
      "depart": "MATH",
      "id": "302",
      "name": "Nx daEhSLoENLOvZLioM",
      "desc": "dJlnuDXyXLeSKChcVCBoQJOylwniFEdhK XlDLshvJBqQlorKGeJfQDwzkzNeiKGzHsqfHTkOjnMQmqJOkeimlQKEgzSUUCiPSjNLIDWnLRsXWNldDWhfEzXychDLBMTJIXThaRMuyRwSbCXTzZhyMnMGLTLlbAmIGtbrkcFpOCGKhdwTlyEIrlHCgdELfxoYeIrjBAv",
      "cred": 3,
      "p": false,
      "pre": [
        "MATH 222",
        "CS 183",
        "MATH 302"
      ]
    },
    {
      "depart": "CS",
      "id": "370",
      "name": "QvPtBe fKWekXvURF Gr",
      "desc": "AGhYOIswfOPtSGP ovPRpXFQrZNzWZeavOlLhoobM rbbSXgagKvoZHgupGYXcCHkyHf jlGpLQeLjrRuBWpTqosrhGqGzyDZEFvJoATpY vbOyjIiSHndBmr IGzTTsKUVmqecPQbvpjHvhPWkWWtuFeRJJnV ZsBReVUcNbwPgMCtMVcJ kZCxisANlvGcdTHMOUia",
      "cred": 4,
      "p": false,
      "pre": []
    },
    {
      "depart": "CS",
      "id": "301",
      "name": "mHRcRkgLmprTuxBgtVRr",
      "desc": "ucdOVcQvfjSssVhTzgYONaIaakakJnqhzXJVTNcgGSLmAidALywLIvfBRfSQFuvyH yDtSJOCSzGEDROSgVqIAybmAcQuZBUK cTKxRjXbOUDqaQOysutNZBAWsNoUwcYyxEigQFDgXvHrRFHlNiucngxsjckg vzNsEWO cFmhUHEPQmXzthJfytVzIBYJlRUqeRPlY",
      "cred": 4,
      "p": false,
      "pre": [
        "MATH 120",
        "MATH 120",
        "CS 194"
      ]
    },
    {
      "depart": "CS",
      "id": "352",
      "name": "eQDNDhsyoaluVcAvmzPb",
      "desc": "ExiFZtYuyAMGJKDDivpWTlIJCHEqWxIPrhZTrQKSXqOwYc kcebMXKHcnaaeoezsXRyZPxaZHGBbVSovoubLGMMfMfSnmAkshLGmStCZWARkXBcIRMLkXoeMPyjHXOzqxPVTq y iYvgnsyESOsVbLDXpOXoyQ EonQbxqWdiWFIcEuvzHfVhuodiIloNdulkXB fonB",
      "cred": 1,
      "p": true,
      "pre": [
        "CS 212",
        "MATH 199",
        "MATH 161"
      ]
    },
    {
      "depart": "MATH",
      "id": "387",
      "name": "MLXxbSXWlgvaj CTJRrz",
      "desc": "pwyaJObFjPpwhdQcQNO ZXZyWWaRQycRLomHOjzJqIAfvHMafCtrwQuzdpDmDcdCWwMtjToeVXeahRSrldiRBkanPZudaCBQRV JHeCSYsIvthrcPxmApcQZcIJbmLGctfDhXaiYWuJWwadWaEeAwgj iMMPisppzjtj JBfgvfVjJPFLaCHiAhDbklAmMJZMtRVUGNF",
      "cred": 2,
      "p": false,
      "pre": [
        "CS 162"
      ]
    },
    {
      "depart": "MATH",
      "id": "395",
      "name": "XRjTdJDKAjNnevnmtzGU",
      "desc": "TlDLIznhGCePAHqZjxfMsYDkXzMLfMnARgLyvejSAbhHRimhoJGnZtWUbjkyAiboAMSfSftyqlbzrbgfGDYwbhjANG cMOGWLEcYbKckSxCsKVFPGuElWGVqzUqJe bvKpCkzUxgVRHPiyWTRAytaGlfujUwMSbkpzvuHAMZWsBloKnGFpTGezUHHsKmUSsoFtOhplKu",
      "cred": 2,
      "p": false,
      "pre": [
        "CS 370"
      ]
    },
    {
      "depart": "MATH",
      "id": "339",
      "name": "KhIpMMzWpXBLafDjDIuu",
      "desc": "GvIYNkrLZYWVlwaesoteyaAnaZUCgvClYtFPgcsJYspXSnIEUydEfGHZFaxOibFqPewTcesqEirEpVrJBy SjmCUvmgybuoyeaVqkyQHmIjKNjsvJWbzcWJLbHLDZTP FDjFgqPyWWVpgSoZIDBzyzKahmcYbhaXWetWooeJMJpUdVlUEwQqQESoULwbTjZfMotxdPDi",
      "cred": 1,
      "p": false,
      "pre": [
        "MATH 140",
        "MATH 127"
      ]
    },
    {
      "depart": "CS",
      "id": "313",
      "name": "DphkoeeCXTkJMKdf Ano",
      "desc": "Mogdm FbhQoZlKEpSCoywVYgKRroTgxlQm uOgKtzGwlvjkRScWcgIZVMAVZTqhoKZOVcvIDvvXgPxefgYmRLUWutduvkoqDyQiKbVlQBzGvrdbhEGtpKqemzobJqopUZlAhDsxKFUxHKxK cuABsajRIvGYymhMdRAeAnQcBzJCZklmhPVEDVVSZwJTRdBBAMIfSfsy",
      "cred": 4,
      "p": false,
      "pre": [
        "MATH 199",
        "CS 192",
        "CS 138"
      ]
    },
    {
      "depart": "MATH",
      "id": "331",
      "name": "LbAlXeCWdG lHUJcGQXr",
      "desc": "iLyqkAVcCYGeLGmb OWuMhkZWWNxjyMewDhiOnJZBiweqIOr SBEQsFVJHodvQdLHHKJ SZTorjOev UaSvFvvJzDVvZNJaDSngHeyuJqZycMIdcAyIHmP HzpILykfPfTPLklVxNe  EfshdfZYFvwsBFODzNvqM RkLCynjswRIYsqCcKealvXXwnJMiOerbud kNS",
      "cred": 4,
      "p": false,
      "pre": [
        "CS 250"
      ]
    },
    {
      "depart": "CS",
      "id": "356",
      "name": " WhZXXXKlxdSzK ssagm",
      "desc": "wmEhigVUiCUMojZFE aIEScSoabdYxKwNEsbhhIYCYXc AMKCVgC ShzbuTnxYSFjatbWqODFgUiEcdhxhPiNWWYMcNKY qQeAjAJTEJMGzOfIypsdBpVYvKDAXBakaIxZFHedjP BwoKGLfvaGVOcFhWNlDksp rUvqTKSxqnnZVqHkClnZrkzdkuRmzKheotBu dbR",
      "cred": 3,
      "p": false,
      "pre": [
        "CS 193"
      ]
    },
    {
      "depart": "MATH",
      "id": "387",
      "name": "CBrPvmLMvQEXzdwaJM c",
      "desc": "CSz HSMVHqKQSZRMvVifByziIoOffUbewhdRACfiYlVYbkfrWSOcnEnGITduhnARNMEJrKNiYlMVFlwPRcqssijbgQeuVGCDKpyOVFnSlESxKUBCcjTZnfrqFljgipkoYkCJkvRrmYNwAnXQcWBmNfAPHuqt  UqvPbMSykMevQCtdOA xyEnJXKXYidVflA  KBKMVV",
      "cred": 4,
      "p": false,
      "pre": [
        "CS 212",
        "MATH 200"
      ]
    },
    {
      "depart": "CS",
      "id": "CS 388",
      "name": "KnAHBXzfKWK KbmQYsT ",
      "desc": "tZDeLgiKMQwwVIncyTT WiGGzFwQeulUeOcOLCxXFklPkQKwOCwSjQTHHZeSYnjEnYAFoGyQEmDyNmk CYsLCetGsYO rbzFxZawzDiKpQjMbVAovUzspyRsmqNNFyIyVEvmxrBYgyHUoYlBAlKMkYDQcDRTv QcPzSJxQeGvD lZmEIAJJiE RKAdbKupiZBAVsBRGO",
      "cred": 2,
      "p": false,
      "pre": [
        "CS 115"
      ]
    },
    {
      "depart": "CS",
      "id": "320",
      "name": "vqVggekJJxwZHXTSZAef",
      "desc": "kbw MsmKjYzaqZEHxIWUEnKtympRRvKHfDnZWfYWsehqSbSdCYUFdrRumViTYOYPhIztVNvtyZc ltrcU OOScMmugivbLzlyjJYDVTggBAjqAIvitLbxfClCckJEwYJXGHUdBFZAeNZvkoDNGgrzmXCYMxtkOkGMJByJJBbGRaTCsTgjiYMWHiSJnafPstLGbqFypxN",
      "cred": 2,
      "p": false,
      "pre": [
        "CS 212",
        "MATH 252",
        "CS 301"
      ]
    },
    {
      "depart": "MATH",
      "id": "363",
      "name": "Hlopz YsthJEXKswxvEd",
      "desc": "cCXDLpzcUVzZlaEqXwPlIAV KjgXZBTggA puZVlupAzZoYrpmQuTtqxaXKxwRsgWWpGindtDssIRWtxgKMxTrpJEuGWtXEYwUZBxTRE XWqyUZXvnchEEoFlsfQQLTTKpdJyQVKcefMXgINurCzVTZHMNVicJITZDdcIafkmFhZQyZArWCvoelkLazrXFlfchsmEhBM",
      "cred": 3,
      "p": false,
      "pre": [
        "CS 128"
      ]
    },
    {
      "depart": "CS",
      "id": "439",
      "name": "wmJVqhcfPfKSj jsRMUz",
      "desc": "kpBpgbMzhZFD QgkZewChwuYmOFaYpCfdDvXAYzYNVQaSDRX qQBwZPRqMpQAEaqPQtqRsKHSVmAEiXOSPjW FQjmrEdegjPHUpyAolKmPm orRsJkIqgxjYzXDpeVqOpjtJR oUiTVfkmLTVHyrrSccJkYzZqJyqWkYyDRKwSDukHfEqoydPusczBzFwbdGWXCGhpRj",
      "cred": 3,
      "p": false,
      "pre": [
        "CS 162",
        "CS 183",
        "CS 164"
      ]
    },
    {
      "depart": "CS",
      "id": "420",
      "name": "ooBxGbyDSeWWEcWURRbd",
      "desc": "HNHRZhJCUcoRkt FQeM ngNmqccqTUuWwTwMELhyMJIzkQVUVTwbHEmjvBYKikueHkm UTsTLzKfrHEuIxKexzha eaQMyRrREaqDTPEMuuXjmBlGKXBFvCgKcBVbcinqngAcUDswNmxyDtlwuiBiCunlYchAJkHvVtuTcXSNA fpkfqVNulMIlvqGjXMgGMDnKqFnPg",
      "cred": 3,
      "p": false,
      "pre": []
    },
    {
      "depart": "CS",
      "id": "462",
      "name": "mTpgfu soYOqDVBmSsMk",
      "desc": "YknmtBEzYjpCMNIzFFTsNAmArYJDsebFMQmPlSXCWdggbLaxknyX NGqejHaSXxiGoNPXWMIkgbSAVwYnVVjCOeGejTXukInSUIOppKArUoEqESdzxtWrOaAffDaNRZXVCSIjmocOuDsTGhaZcIhzE aZKXSzXDAsAjkvLyhSYmzffimpDKxITSPKJJSEoQtNqiGSHOp",
      "cred": 4,
      "p": false,
      "pre": [
        "MATH 363",
        "MATH 138"
      ]
    },
    {
      "depart": "MATH",
      "id": "466",
      "name": "bOUrMRxjRgCYUNoxdJvZ",
      "desc": "PDYgIxnvZZuKCYERmQkFUCIyQjWFkygvsaQerCcsRjmhXsyUIWQ oPqKmdhmMrfgVznMHnWPqCsGHBDnVwJeRCuHyWKPUoEflskrY xRRpOXCiEdFNZJDrbnqLZvXPxAFCSRJuGBFhYQCRqpPlpvAMhaBANCzKTWaCLsvUXoVClkPrvdmbyTIMSO SAvqRyAzbvlJnol",
      "cred": 4,
      "p": false,
      "pre": [
        "MATH 158",
        "CS 192"
      ]
    },
    {
      "depart": "CS",
      "id": "493",
      "name": " XLsUNZWkqCdLavNzwBC",
      "desc": "XwiINaOZjNuTcOgBgwiyQKRLbUCPxjxu ARUnigZFDSLQLcNvyaI niFXqDDhaDKISDIrOzAzTUIoSTKpsyRTWDdtqpbxHArrHZvmuSf qaJpvURohSSdOWhuYrvNVNNBqKhniFUDLHuxKBzKRumahqgucykSofJpNQZLmmscvJWcHwkisydrRhfKlEpAPCuwahwsCTU",
      "cred": 2,
      "p": false,
      "pre": [
        "MATH 120",
        "CS 193",
        "CS 162"
      ]
    },
    {
      "depart": "MATH",
      "id": "457",
      "name": "tfSywRECTfKatibIYBGu",
      "desc": "clklCtMtdeaAsKugnQgqASqsLfiGWoSXgeConjQnWKzbONmcePgtjweeTQaIgEXWCgRNLTRwXIGbByiVwdgOsDerDykdZBluGRAkBEtTnRXvvybfJEEFcDqGwfwYVtWfINEZREcMLYwkZkGme FZpfUCyyeywONJRdurwywNvKLWtSzqVKsGUZpgLCJkIyWedhlxnhdZ",
      "cred": 4,
      "p": false,
      "pre": [
        "CS 212"
      ]
    },
    {
      "depart": "MATH",
      "id": "452",
      "name": "GQmXbeCOEKRXQdx SBTB",
      "desc": "aUDtqRUpCLDVLOZLjqsjTOtBRwTwoLEAqPadGKkNvpWylsnpOZ OUXEpbFbONBLHzdjjfybfYGcwHvMCFfRZrczBtRvCmdRSaocOzdDZiGdPojOcfOUFxijXMggrRFlOqlVlHaZ WkAtXPYUhgtCpzrQzzdTMqbWvGJPPvzLXyAHT SAVcfiIzrmGeYfYSuiTcJNdJqa",
      "cred": 4,
      "p": false,
      "pre": [
        "CS 115",
        "CS 352"
      ]
    },
    {
      "depart": "MATH",
      "id": "490",
      "name": "MEfpxBodSTbaBiIsctnG",
      "desc": "wwBbYsrTzosaqVkrDpLAiHhCGIsqzndOiVLtXTBUJVtOmGJBNJHctNzHifYnkhQqXGzS myEUmsWuGXzcmZXwOrjsnMRvCRhIiuJAOooyTTfbroPIKBHFEMLaa i vtJxAPB RdUcbnxahPlfSncsCPbTwqztZZrHmluTxZhENNwmeaPGJQQxCtjavgsXUTbnKPGuziE",
      "cred": 3,
      "p": false,
      "pre": [
        "MATH 200",
        "CS 192",
        "MATH 138"
      ]
    },
    {
      "depart": "MATH",
      "id": "478",
      "name": "AFwbrOcFaTHanIcfSAcu",
      "desc": "qEuoMbsRPRnAbQGctkVjQzDPtrVimCuAHTAzoeKBlPSReTRwDQznxDusNhOBNElRQYsUawMvWcYoiTiINLZwcYwBYSmjNnuYSCDkkmLSSQOvO yjxDYqWfHJfIzQQkVPO vkl gMbBaqDxqYvpgQRsBBbIYirkGdVtbfsNdFSvKXSdWRkYeqFjRKSnW W it VSGINl ",
      "cred": 3,
      "p": false,
      "pre": [
        "MATH 120"
      ]
    }
  ]
}



//will probably want to change if we get to it, this was fastest
let entries = [];
let names = [];
let graph = undefined;

function getColor(entry) {

  if (entry.depart === "CS") {
    if (entry.highlighted === true) {
      return "GreenYellow";
    } else {
      return "Green";
    }
  } else {
    if (entry.highlighted === true) {
      return "Cyan";
    } else {
      return "Blue";
    }
  }

}

function getSize(entry) {

  if (entry.selected === true) {
    return 20;
  } else {
    return 10;
  }

}

function selectCircle(entry) {
  console.log("clicked");
  let found = false;
  let sel = entries[0];
  console.log("entry: " + entry.id)
  for (let i = 0; i < entries.length; i++) {
    if (entry.depart + " " + entry.id === entries[i].info) {
      console.log("found");
      found = true;
      sel = entries[i];
    } else {
      entries[i].selected = false;
      entries[i].highlighted = false;
    }
  }

  if (found === true) {
    if (entry.selected === false) {
      entry.selected = true;
      entry.highlighted = true;
      console.log("sel highlighted: " + sel.highlighted + " should be true")
      for (let i = 0; i < entries.length; i++) {
        for (let k = 0; k < entries.length; k++) {
          let name = entries[k].depart + " " + entries[k].id;
          if (sel.pre.includes(name)) {
            console.log("highlighting");
            entries[k].highlighted = true;
          } else {
            entries[k].highlighted = false;
          }

        }
      }
    } else {
      entry.selected = false;
      entry.highlighted = false;
      for (let i = 0; i < entries.length; i++) {
        for (let k = 0; k < entries.length; k++) {
          let name = entries[k].depart + " " + entries[k].id;
          if (sel.pre.includes(name)) {
            entries[k].highlighted = false;
          } else {
            entries[k].highlighted = false;
          }

        }
      }
    }
    console.log("made it this far")
    draw();
  }

}

function getText(entry) {
  if (entry.selected === false) {
    return entry.depart + " " + entry.id;
  } else {
    return entry.depart + " " + entry.id + ": " + entry.name + "  - " + entry.desc;
  }
}

function draw() {
  graph.selectAll("*").remove();

  //draw lines
  //arrows will seem to rquire the use of svg polygons. calculating them will probably be a little complex and I'd rather finalize how
  //we will calculate the positions of everything else before we figure that out

  for (let i = 0; i < entries.length; i++) {
    console.log("entries 1:" + entries)
    let me = entries[i];
    let name = me.depart + " " + me.id;

    for (let k = 0; k < entries.length; k++) {
      let name = entries[k].depart + " " + entries[k].id;
      if (me.pre.includes(name)) {
        graph.append("line").attr("x1", me.x).attr("x2", entries[k].x).attr("y1", me.y).attr("y2", entries[k].y).attr("stroke", "black").attr("stroke-width", "1");
      }

    }
  }

  //draw circles
  let verts = graph.selectAll('g').data(entries);

  let vert = verts.enter();
  let grp = vert.append("g").attr("id", function (entry) { return entry.depart + " " + entry.id }).on("click", function (entry) { return selectCircle(entry) });
  grp.append("circle").attr("cx", function (entry) { return entry.x }).attr("cy", function (entry) { return entry.y }).attr("r", function (entry) {
    return getSize(entry)
  }).attr("fill", function (entry) {
    return getColor(entry)
  });
  grp.append("text").attr("x", function (entry) { return entry.x - 5 }).attr("y", function (entry) { return entry.y }).attr("style", "font-size: 5").text(function (entry) {
    return getText(entry)
  });

}

function start(inc) {
  graph = inc;
  draw();
}

class Graph extends Component {

  constructor() {
    super();
    /*this.draw = this.draw.bind(this);
    this.getColor = this.getColor.bind(this);
    this.getSize = this.getSize.bind(this);
    this.selectCircle = this.selectCircle(this);*/
  }





  shouldComponentUpdate() {
    return false;
  }


  componentDidUpdate() {
    this.draw();
  }



  componentDidMount() {
    //have selected department setting, display only if in that department or dependent on it
    for (let i = 0; i < crs.courses.length; i++) {
      let entry = new Object();
      entry.depart = crs.courses[i].depart;
      entry.id = crs.courses[i].id;
      entry.name = crs.courses[i].name;
      entry.desc = crs.courses[i].desc;
      entry.cred = crs.courses[i].cred;
      entry.p = crs.courses[i].p;
      entry.pre = crs.courses[i].pre;
      entry.info = crs.courses[i].depart + " " + crs.courses[i].id;

      entry.x = Math.floor(Math.random() * 950 + 50);
      entry.y = Math.floor(Math.random() * 950 + 50);
      entry.selected = false;
      entry.highlighted = false;
      if (names.includes(entry.depart + " " + entry.id) === false) {
        entries.push(entry);
        names.push(entry.depart + " " + entry.id);
      }
    }

    this.img = d3.select(this.refs.vis).attr("viewBox", "0 0 1000 1000");
    start(this.img);
  }




  render() {
    return <svg ref="vis" className="Graph" />;
  }
}

export default Graph;
