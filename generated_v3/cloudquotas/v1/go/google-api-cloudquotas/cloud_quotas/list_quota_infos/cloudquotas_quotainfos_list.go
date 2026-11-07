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

// [START cloudquotas_v1_cloudquotas_quotainfos_list]

import (
	"context"
	"fmt"
	"io"

	cloudquotas "cloud.google.com/go/cloudquotas/apiv1beta"
	cloudquotaspb "cloud.google.com/go/cloudquotas/apiv1beta/cloudquotaspb"
	"google.golang.org/api/iterator"
)

// listQuotaInfos lists quota information for a specified service.
func listQuotaInfos(ctx context.Context, w io.Writer, projectID string, locationID string, serviceID string) error {
	parent := fmt.Sprintf("projects/%s/locations/%s/services/%s", projectID, locationID, serviceID)

	client, err := cloudquotas.NewClient(ctx)
	if err != nil {
		return fmt.Errorf("NewClient failed: %w", err)
	}
	defer client.Close()

	req := &cloudquotaspb.ListQuotaInfosRequest{
		Parent: parent,
	}

	it := client.ListQuotaInfos(ctx, req)
	for {
		quotaInfo, err := it.Next()
		if err == iterator.Done {
			break
		}
		if err != nil {
			return fmt.Errorf("Next failed: %w", err)
		}
		fmt.Fprintf(w, "Quota info: %s\n", quotaInfo.GetName())
	}

	return nil
}

// [END cloudquotas_v1_cloudquotas_quotainfos_list]
