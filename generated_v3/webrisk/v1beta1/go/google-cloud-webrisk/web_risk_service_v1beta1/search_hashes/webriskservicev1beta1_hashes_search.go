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

// [START webrisk_v1beta1_webriskservicev1beta1_hashes_search]

import (
	"context"
	"fmt"
	"io"
	"os"

	webrisk "cloud.google.com/go/webrisk/apiv1beta1"
	webriskpb "cloud.google.com/go/webrisk/apiv1beta1/webriskpb"
	"google.golang.org/api/option"
)

// searchHashes searches for full hashes matching a hash prefix.
func searchHashes(ctx context.Context, w io.Writer) error {
	threatTypes := []webriskpb.ThreatType{
		webriskpb.ThreatType_MALWARE,
		webriskpb.ThreatType_SOCIAL_ENGINEERING,
	}
	hashPrefix := []byte("example-hash")

	var opts []option.ClientOption
	if projectID := os.Getenv("GOOGLE_CLOUD_PROJECT"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	} else if projectID := os.Getenv("PROJECT_ID"); projectID != "" {
		opts = append(opts, option.WithQuotaProject(projectID))
	}

	client, err := webrisk.NewWebRiskServiceV1Beta1Client(ctx, opts...)
	if err != nil {
		return fmt.Errorf("NewWebRiskServiceV1Beta1Client failed: %w", err)
	}
	defer client.Close()

	req := &webriskpb.SearchHashesRequest{
		HashPrefix:  hashPrefix,
		ThreatTypes: threatTypes,
	}

	resp, err := client.SearchHashes(ctx, req)
	if err != nil {
		return fmt.Errorf("SearchHashes failed: %w", err)
	}

	fmt.Fprintf(w, "Found %d threats\n", len(resp.GetThreats()))
	for _, threat := range resp.GetThreats() {
		fmt.Fprintf(w, "Threat types: %v\n", threat.GetThreatTypes())
	}

	return nil
}

// [END webrisk_v1beta1_webriskservicev1beta1_hashes_search]
