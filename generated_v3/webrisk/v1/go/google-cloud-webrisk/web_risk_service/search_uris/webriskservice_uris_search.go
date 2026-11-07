// Copyright 2026 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package main

// [START webrisk_v1_webriskservice_uris_search]

import (
	"context"
	"fmt"
	"io"

	webrisk "cloud.google.com/go/webrisk/apiv1beta1"
	webriskpb "cloud.google.com/go/webrisk/apiv1beta1/webriskpb"
)

// searchUris searches the Web Risk database for threats associated with a URI.
func searchUris(ctx context.Context, w io.Writer, uri string) error {
	threatTypes := []webriskpb.ThreatType{
		webriskpb.ThreatType_MALWARE,
		webriskpb.ThreatType_SOCIAL_ENGINEERING,
	}

	client, err := webrisk.NewWebRiskServiceV1Beta1Client(ctx)
	if err != nil {
		return fmt.Errorf("NewWebRiskServiceV1Beta1Client: %w", err)
	}
	defer client.Close()

	req := &webriskpb.SearchUrisRequest{
		Uri:         uri,
		ThreatTypes: threatTypes,
	}

	resp, err := client.SearchUris(ctx, req)
	if err != nil {
		return fmt.Errorf("SearchUris: %w", err)
	}

	if resp.GetThreat() != nil {
		fmt.Fprintf(w, "The URI has threat types: %v\n", resp.GetThreat().GetThreatTypes())
	} else {
		fmt.Fprintf(w, "The URI has no detected threats.\n")
	}

	return nil
}

// [END webrisk_v1_webriskservice_uris_search]
